$(document).ready(function(){
			var numOfTrainers = 0;
			
			$("#display-trainers").hide();
			$("#display-def-trainers").hide();
			$("#show-trainers-div").html(function() {
					var city = $("#citySelect").val();
					var speciality = $("#specialitySelect").val();
					$("#display-def-trainers").show();
			});
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
					op += '<span style="float:left;padding:0 30px 20px 0;"><img src="img/avator.jpg" alt="Img" height="100px" width="100px"></img><a style="color:white;text-decoration:underline;font-weight:bold;" href="signup.html?id='+email[i].split("@")[0]+'" target="_blank" id="'+ email[i] +'" ><br> <span id = "trainerName" >' + trainerName[i] + ' </span></a> <br><span id = "price" style="color:white">Price: ' + price[i] +' </span></span>'		
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
		//window.location.href="homepage.html#display-trainers";
		$('html, body').animate({scrollTop:700}, 'slow');
}

function checkUser() {
var emailId = document.getElementById('txtEmail').value;
var pass = document.getElementById('txtPassword').value;

var query = new Parse.Query("Users");
query.equalTo("email", emailId);
query.equalTo("password", pass);
query.find({
		success: function(result) {				
				var userType = result[0].get('Type');
				if(userType == 'Trainer')
				{
					window.location = "trainerDashboard.html?id=" + emailId.split('@')[0] + " ";
				}
				else {
					window.location.href = "homepageTrainee.html?id="+ emailId.split('@')[0] +" ";
				}
		},
		error: function(error) {	
			alert("Invalid username or password");
		}
		});
}