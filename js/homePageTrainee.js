$(document).ready(function(){
	var traineeName='';
emailParam = window.location.search.substring(1).split('=')[1];
var query = new Parse.Query("Trainee");
			 query.contains("Email", emailParam);
query.find({
			success: function(result) {
				traineeName = result[0].get('Name');
				$('#traineeName').html(traineeName);
			},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
		});	
		
requestStatus(emailParam);

});

function requestStatus(emailParam){
var trainee = emailParam;
var trainerId='';
var time ='';
var location='';
var trainerName='';
var query = new Parse.Query("Request");
var trainerData = new Parse.Query("Trainer");
query.contains("TraineeId",trainee);
query.find({
			success: function(result) {
				for(var i=0;i<result.length;i++){
				trainerId = result[i].get('TrainerId');
				time = result[i].get('TimePicked');
				location = result[i].get('Location');

				trainerData.contains("email",trainerId);
				trainerData.find({
			success: function(results) {
				trainerName = results[0].get('name');
				if (location == "TrainerStudio"){
					location = results[0].get('address');
				}
			},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
		});	
			}

			},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
		});	


}

function logout(){
	window.location.href = "index.html";
}