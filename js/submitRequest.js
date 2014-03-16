var todayTime = [];
var tomorrowTime = [];
var todayFlag = [];
var tomorrowFlag = [];
var currDate = new Date();
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var emailParam;
var errName = '';
	var errEmail = '';
	var errPassword = '';
	var errAddress='';
	var errCity = '';
	var errZip='';
	var traineesName = '';

$(document).ready(function(){

            
			
			 emailParam = window.location.search.substring(1).split('=')[1];
			 
			 trainerLoad(emailParam);
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
				
				/*var todayOp = "";
				todayOp += "<h4>"+ day[currDate.getDay()]+",&nbsp;"+ month[currDate.getMonth()]+"&nbsp;"+ currDate.getDate() +"</h4>";
				for (var i = 0; i < todayTimeArr.length; i++) { 
					todayOp += '<input type ="radio" id="rbtnmyaddress" name="Time" value = "' + todayTime[i] + '">&nbsp;'+ todayTime[i] + '</input> &nbsp;&nbsp;';					
				}*/
				var tomorrowOp = "";
				var tomorrowDate = currDate.getDate() + 1;
				tomorrowOp += "<h4>"+ day[(currDate.getDay()+1)%7]+",&nbsp;"+ month[currDate.getMonth()]+"&nbsp;"+ tomorrowDate +"</h4>";
				for (var i = 0; i < tomorrowTime.length; i++) { 
					tomorrowOp += '<input type ="radio" id="rbtnmyaddress" name="Time" checked=checked value = "' + tomorrowTime[i] + ' ">&nbsp;'+ tomorrowTime[i] + '</input> &nbsp;&nbsp;';					
				}
			$("#tomorrowTimeDiv").html(tomorrowOp);
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
		});	
		
});

function signUp(){

var traineeDetails = new Trainee();
var traineeIdentify = new Users();
var request = new Request();
var gender;
var location = $('input:radio[name=rbtnLocation]:checked').val();
var timePicked = $('input:radio[name=Time]:checked').val();
traineesName = document.getElementById('name').value;
if(document.getElementById('M').checked){ gender = "male"; }
else gender = "female";
traineeDetails.set({"Name":document.getElementById('name').value,"Email":document.getElementById('email').value,"Address" :document.getElementById('address').value,"Password": document.getElementById('password').value,"Gender":gender, "City":document.getElementById('city').value,"ZipCode":document.getElementById('zip').value
});
traineeIdentify.set({"email":document.getElementById('email').value,"password":document.getElementById('password').value,"Type":"Trainee"

});

traineeDetails.save(null, {
	success: function(traineeDetails) {
        var traineeEmail = document.getElementById('email').value.split('@')[0];
        var op ='';

		traineeIdentify.set({"email":document.getElementById('email').value,"password":document.getElementById('password').value,"Type":"Trainee"});
		traineeIdentify.save();
		request.set({"TrainerId":emailParam,"TraineeId":traineeEmail,"TimePicked":timePicked, "Location":location});
		request.save(null, {
			success: function(request) {
				alert('Your request has been submitted.');
				window.location.href = "homepageTrainee.html?id="+traineeEmail;	
				
			
			},
			error: function(request, error) {
				alert('Failed to submit request. Please login and submit again');
			}
		});

	},
	error: function(traineeDetails, error) {
		alert('Failed to submit request. Please try again.');
	}
}); 





}

function clearErrMsg(){
	 errName = '';
	 errEmail = '';
	 errPassword = '';
	 errAddress='';
	 errCity = '';
	 errZip='';
}



function formValidation(){
	
	var emailChk = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var ZipCheck = /^[0-9]+$/;
	var flag = 0;

    if(document.getElementById('name').value=='')
    {
    	errName= "Name is required";
		flag = 1;
    }
    $("#errorDiv").html(errName);
    if(document.getElementById('email').value=='')
    {
    	errEmail= "Email is required";
		flag = 1;
    }
    else if( !emailChk.test( document.getElementById('email').value ) ) {
    	errEmail= "Not a valid email format";
		flag = 1;

    }
    $("#errorDiv1").html(errEmail);
    if(document.getElementById('password').value=='')
    {
    	errPassword= "Password is required";
		flag = 1;
    }
    $("#errorDiv2").html(errPassword);
    if(document.getElementById('address').value=='')
    {
    	errAddress= "Address is required";
		flag = 1;
    }
    $("#errorDiv3").html(errAddress);
    if(document.getElementById('city').value=='')
    {
    	errCity= "City is required";
		flag = 1;
    }
    $("#errorDiv4").html(errCity);
    if(document.getElementById('zip').value=='')
    {
    	errZip= "Zip Code is required";
		flag = 1;
    }
    else if ( !ZipCheck.test(document.getElementById('zip').value)){
        errZip= "Zip Code should be numbers only";
		flag = 1;
    }
    $("#errorDiv5").html(errZip);
	
	if(flag == 0){
		signUp();
	}
	
}

function trainerLoad(emailParam)
		{
			    var myParam = emailParam;
			    //var param= "XlIayM9M2Z";
			    var query= new Parse.Query("Trainer");
			   
			    query.contains("email",myParam);
			   			    query.find({
  				success: function(object) {
  				

        var content='<div >';
         content+='<div style="float:left; padding-right:10px">';

         content+='<img src="img/avator.jpg" alt="Img" height="200px" class="img-thumbnail" width="200px"></img></div>';
        content+='<div style="float:center">';
        content += '<h2>' + object[0].get("name") + '</h2>';

        content+= '<p><b>Gender:</b> ' + object[0].get("Gender") + '</p>';
        content += '<p><b>Speciality:</b> ' + object[0].get("speciality") + '</p>';

        content+= '<p><b>Rating:</b> ' + object[0].get("Rating") + '</p>';
        content += '<p><b>Address:</b> ' + object[0].get("address") + '</p>';
        content += '<p><b>Email:</b> ' + object[0].get("email") + '</p>';
        content += '<p><b>Rate per Hour:</b> ' + object[0].get("priceRangeIndi") + '</p>';
        content+='<div  style="float:left;padding-top:10px;padding-right:20px;text-align:justify;">';
		content+= '<p> ' + object[0].get("Brief_Description") + '</p></div>';


       
        content +='</div> </div>';
        $(content).appendTo("#trainer-info");
        

  				},
  				error: function(object, error) {
    				alert("error");
    			}

		});
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
					window.location.href = "trainerDashboard.html?id=" + emailId.split('@')[0] + " ";
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
