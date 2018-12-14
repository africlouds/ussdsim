import frappe
import requests


@frappe.whitelist(allow_guest=True)
def query(query):
	if not query or query[0] != "*"  or query[-1] != "#":
		frappe.throw("Invalid format")
	code = query[:-1].split("*")[1]
	if len(code) != 3:
		frappe.throw("Invalid code")
	try:
		int(code)
		code = frappe.get_doc("USSD Code", code)
		r = requests.get(code.end_point + "?query=" + query).json()
		return r['message']
	except Exception as e:
		frappe.throw(str(e))
