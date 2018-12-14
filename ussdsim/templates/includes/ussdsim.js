ussdsim  = function(page) {

	$('#ussd-query-button').click(function(){
		frappe.call({
			method:"ussdsim.api.query",
			args: {
				query: $('#ussd-query-txt').val()
			},
			callback: function(data){
				var message = data.message.message
				var options = "<div><ol>";
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
