var todayTime = [];
var tomorrowTime = [];
var todayFlag = [];
var tomorrowFlag = [];
var currDate = new Date();
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
$(document).ready(function(){
			
			 var emailParam = window.location.search.substring(1).split('=')[1];
			 
			 Parse.initialize("MrTfNhgWN17jnkopOJ7TWJYmxy8juC7FtvegRGaz", "jWjKNBuaEEBaLYVcFBWNqAqJ1hq74vDlGwNdipPC");  
			 var query = new Parse.Query("Trainer");
			 query.contains("email", emailParam);
		
			query.find({
			success: function(results) {
				var todayTimeArr = results[0].get('today');
				var tomorrowTimeArr = results[0].get('tomorrow');
				for(var i = 0; i < todayTimeArr.length ; i++)
				{
					todayTime[i] = todayTimeArr[i].time;
					todayFlag[i] = todayTimeArr[i].flag; 
				}
				for(var i = 0; i < tomorrowTimeArr.length ; i++)
				{
					tomorrowTime[i] = tomorrowTimeArr[i].time;
					tomorrowFlag[i] = tomorrowTimeArr[i].flag; 
				}
				
				var todayOp = "";
				todayOp += "<h4>"+ day[currDate.getDay()]+",&nbsp;"+ month[currDate.getMonth()]+"&nbsp;"+ currDate.getDate() +"</h4>";
				for (var i = 0; i < todayTimeArr.length; i++) { 
					todayOp += '<input type ="radio" id="rbtnmyaddress" name="Time">&nbsp;'+ todayTime[i] + '</input> &nbsp;&nbsp;';					
				}
				var tomorrowOp = "";
				var tomorrowDate = currDate.getDate() + 1;
				tomorrowOp += "</br><h4>"+ day[(currDate.getDay()+1)%7]+",&nbsp;"+ month[currDate.getMonth()]+"&nbsp;"+ tomorrowDate +"</h4>";
				for (var i = 0; i < tomorrowTime.length; i++) { 
					tomorrowOp += '<input type ="radio" id="rbtnmyaddress" name="Time">&nbsp;'+ tomorrowTime[i] + '</input> &nbsp;&nbsp;';					
				}
			$("#todayTimeDiv").html(todayOp);
			$("#tomorrowTimeDiv").html(tomorrowOp);
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
		});	
		
});
		
