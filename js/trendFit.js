$(document).ready(function(){
			$("#display-trainers").hide();
			$("#display-def-trainers").hide();
			$("#show-trainers-div").html(function() {
					var city = $("#citySelect").val();
					var speciality = $("#specialitySelect").val();
					$("#display-def-trainers").show();
			});
alert("test");
Parse.initialize("MrTfNhgWN17jnkopOJ7TWJYmxy8juC7FtvegRGaz", "jWjKNBuaEEBaLYVcFBWNqAqJ1hq74vDlGwNdipPC");  
		
		});
				
function searchTrainer() {
		$("#display-def-trainers").hide();
		var myCity = $("#citySelect").val();
		var mySpeciality = $("#specialitySelect").val();
		$("#cityName").html(myCity);

		var query = new Parse.Query("Trainer");
		query.contains("address", myCity);
		if(mySpeciality != null)
			query.contains("speciality", mySpeciality);
		query.find({
			success: function(results) {
				alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned Parse.Object values
				for (var i = 0; i < results.length; i++) { 
					var object = results[i];
					alert(object.get('address') + ' - ' + object.get('name'));
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
		});	
		
		
		$("#show-trainers-div").html(function() {
					var city = $("#citySelect").val();
					var speciality = $("#specialitySelect").val();
					$("#display-trainers").show();
			});

}