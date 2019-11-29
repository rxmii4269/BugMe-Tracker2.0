"use strict";


window.onload = () => {

	let home = document.getElementById('home');
	let issue = document.getElementById('newissue');
	let adduser = document.getElementById('adduser');
	let logout = document.getElementById('logout');
	this.$('#center').load('home.html');

	home.addEventListener('click', () => {
		this.console.log("home clicked");
		this.$('#center').load('home.html');
	});


	issue.addEventListener('click', () => {
		this.console.log("btn-clicked");

		this.$('#center').load("new_issue.html ",function(){
			var errorcolor="#E45449";
			var newissue=document.querySelector('#new_issuebtn');
			var title = document.getElementById('title');
			var des = document.getElementById('description');
			var user = document.getElementById('user');
			var errortype =document.getElementById('error_type');
			var priority= document.getElementById('priority');
			var titleexp = /[a-zA-z]+/;
			var desexp =/[a-zA-z0-9]/;
			var userexp=/[a-zA-z]+/;
			var priorityexp =/(Minor|Major|Critical)/;
			var errortypeexp = /(Bug|Proposal|Task)/;

			newissue.onclick=function(){

				if(titleexp.test(title.value)&& desexp.test(des.value)&& 
					userexp.test(user.value)&&priorityexp.test(priority.value)
					&&errortypeexp.test(errortype.value)){
					alert('yes');
					$.ajax({
						type:"POST",
						url:"/scripts/php/bugMe.php",
						data: {title:title.value,description:description.value
							,user:user.value,error_type:error_type.value,
							priority:priority.value,Submitbtn:new_issuebtn.value},
						success:function(data){alert (data)}


				});

				}
				else{
					if(titleexp.test(title.value)==false){
						title.style.backgroundColor=errorcolor;

					}
					if(desexp.test(des.value)==false){
						des.style.backgroundColor=errorcolor;

					}
					if(userexp.test(user.value)==false){
						user.style.backgroundColor=errorcolor;
					}
					if(priorityexp.test(priority.value)==false){
						priority.style.backgroundColor=errorcolor;
					}
						
					if(errortypeexp.test(errortype.value)==false){
						errortype.style.backgroundColor=errorcolor;
						
					}

						alert(" remember to fix reg expression");
				}



				


				
			}// end off submit user function 
		});// end of  add issue event listener 
		
	});


	adduser.addEventListener('click', () => {
		this.console.log('userclicked');
		this.$('#center').load('new_user.html');
		// Main();
	});

	logout.addEventListener('click',()=>{
		//this.$('#center').load('index.html');
	});

};


function home() {

	var errorcolor = "#E45449";
	var newuser = document.querySelector('#newuserbtn');
	var first = document.getElementById('firstname');
	var last = document.getElementById('lastname');
	var pw = document.getElementById('password');
	var email = document.getElementById('email');
	var nameexp = /[a-z]/;
	var pwexp = /[a-zA-Z0-9]+/; //need to fix[a-zA-z0-9]+\@[a-z]+\.[a-z]{3}
	var emailexp = /[a-zA-z0-9]+\\@[a-z]+\.[a-z]{3}/;
	//var newissue=document.querySelector('#new_issuebtn');

	newuser.onclick = function () {


		if ((nameexp.test(first.value) && nameexp.test(last.value) && emailexp.test(email.value)) &&
			(pwexp.test(pw.value) && pw.value.length >= 8)) {


			this.$.ajax({
				type: "POST",
				url: "database.php",
				data: {'firstname':firstname.value,'lastname':lastname.value,'password':password.value,
		'Email':email.value,'Submitbtn':newuserbtn.value },
				success: function (data) {
					alert(data);
				}


			});

			this.alert('form validated');

		} else {
			if (nameexp.test(first.value) == false) {
				var nt = document.getElementById('firstname');

				nt.style.backgroundColor = errorcolor;


			}
			if (nameexp.test(last.value) == false) {
				nt = document.getElementById('lastname');

				nt.style.backgroundColor = errorcolor;

			}

			if (emailexp.test(email.value) == false) {
				var nt = document.getElementById('email');

				nt.style.backgroundColor = errorcolor;

			}
			if ((pwexp.test(pw.value) == false || pw.value.length < 8)) {
				nt = document.getElementById('password');

				nt.style.backgroundColor = errorcolor;


			}


			alert('not validated remember to fix reg expression');
		}
		//alert(email.value);
		//alert( first.value,last.value, pw.value, email.value);

	}







	alert("loaded");

}
