$(document).ready(function(){
			var numOfTrainers = 0;
			
			$("#display-trainers").hide();
			$("#display-def-trainers").hide();
			$("#show-trainers-div").html(function() {
					var city = $("#citySelect").val();
					var speciality = $("#specialitySelect").val();
					$("#display-def-trainers").show();
			});

Parse.initialize("MrTfNhgWN17jnkopOJ7TWJYmxy8juC7FtvegRGaz", "jWjKNBuaEEBaLYVcFBWNqAqJ1hq74vDlGwNdipPC");  
		
		});
				
function searchTrainer() {
		var trainerName = [];
		var price = [];
		var email = [];
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
				numOfTrainers = results.length;

				// Do something with the returned Parse.Object values
				var op = "";
				for (var i = 0; i < results.length; i++) { 
					var object = results[i];
					trainerName[i] = object.get('name');
					email[i] = object.get('email');
					price[i] = object.get('priceRangeIndi');
					op += '<span style="float:left;padding:0 30px 20px 0;"><img src="img/avator.jpg" alt="Img" height="100px" width="100px"></img><a href="signup.html?id='+email[i].split("@")[0]+'" target="_blank" id="'+ email[i] +'" ><br> <span id = "trainerName" >' + trainerName[i] + ' </span></a> <br><span id = "price">' + price[i] +' </span></span>'		
				}
			$("#trainers-list").html(op);
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

