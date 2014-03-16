var trainerName;
var emailParam;
var currDate = new Date();
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var trainee = [];
$(document).ready(function(){

			 emailParam = window.location.search.substring(1).split('=')[1];
  
			 var query = new Parse.Query("Trainer");
			 query.contains("email", emailParam);
			
			query.find({
			success: function(results) {
				trainerName = results[0].get('name');
				$("#trainerName").html(trainerName);
				
				htmlOP = '';
				htmlOP += '<table border="1px black"><tr ><th style="text-align:center;">&nbsp;&nbsp;Trainee&nbsp;&nbsp;</th><th style="text-align:center;">&nbsp;&nbsp;Time&nbsp;&nbsp;</th><th style="text-align:center;">&nbsp;&nbsp;Location&nbsp;&nbsp;</th><th style="text-align:center;">&nbsp;&nbsp;Action&nbsp;&nbsp;</th></tr><tr>';  
				
				
				var reqQuery = new Parse.Query("Request");
				
				reqQuery.contains("TrainerId", emailParam);
				reqQuery.find({
					success: function(req) {
						for(var i = 0; i < req.length; i++)
						{
							var loc;
							if(req[i].get('Location') == "TrainerStudio") {
								loc = "Your Studio";
							}
							else {
								loc = "Trainee's Home";
							}
							
							htmlOP+='<tr><td>&nbsp;&nbsp;'+req[i].get('TraineeId')+'</td><td>&nbsp;' + req[i].get('TimePicked') + '&nbsp;</td><td>&nbsp;' + loc + '&nbsp;</td>';
							htmlOP+= '<td><a class="btn" role="button">Accept</a> &nbsp;&nbsp;<a class="btn" role="button">Decline</a> </td></tr>';		
							$("#requestsDiv").html(htmlOP);	
						
						}
						htmlOP += '</table>';										
						$("#requestsDiv").html(htmlOP);						
					},
					error: function(error) {
						alert("Error loading requests");
					}
					});								
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
			});	
});

function logout(){
	window.location.href = "index.html";
}