ussdsim  = function(page) {
	var next_options = Array(
			'*123*1*15043*245#'	
		)

	$('#ussd-query-button').click(function(){
		frappe.call({
			method:"ussdsim.api.query",
			args: {
				query: $('#ussd-query-txt').val()
			},
			callback: function(data){
				var message = data.message.message
				var options = "<div><ol>";
				localStorage.setItem('options',  JSON.stringify(data.message.options));
				data.message.options.forEach(function(option){
					if(option.trim() != "")
						options += "<li>" + option + "</li>";
				})
				options += "</ol></div>"
				message += options
				$("#response-text").html(message)
				$("#myModal").modal();
			}
		})
	});
	$('#ussd-response-button').click(function(){
		var selected_option = $('#ussd-response-txt').val()
		const options = JSON.parse(localStorage.getItem('options'));
		var option = (options[selected_option-1])
		option = option.split("-")
		var query = "*123*1*"+option[0].trim()+"*"+option[1].replace(".0USD","").trim()+"#"
		frappe.call({
			method:"ussdsim.api.query",
			args: {
				query: query 
			},
			callback: function(data){
				var message = data.message.message
				var options = "<div><ol>";
				localStorage.setItem('options',  JSON.stringify(data.message.options));
				data.message.options.forEach(function(option){
					if(option.trim() != "")
						options += "<li>" + option + "</li>";
				})
				options += "</ol></div>"
				message += options
				$("#response-text").html(message)
				$("#myModal").modal();
			}
		})
	});

}
