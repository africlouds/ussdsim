import frappe
import requests


@frappe.whitelist(allow_guest=True)
def query(query):
	if not query or query[0] != "*"  or query[-1] != "#":
		frappe.throw("Invalid format")
	try:
		code = query[:-1].split("*")[1]
		if len(code) != 3:
			frappe.throw("Invalid code")
		int(code)
		code = frappe.get_doc("USSD Code", code)
		s = requests.Session()
		r = s.post('http://uoh.africlouds.com:8000/api/method/login', data = {'usr':'administrator', 'pwd':'frappe'})
		r = s.get(code.end_point + "?query=" + query).json()
		msg = r['message']
		resp = {
			'ref': msg.split(":")[0].split(",")[0],
			'message': msg.split(":")[0].split(",")[1], 
			'options': msg.split(":")[1].split(",")
		}
		return resp
	except Exception as e:
		frappe.throw(str(e))
