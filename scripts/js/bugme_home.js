"use strict";


window.onload = () => {

	let home = document.getElementById('home');
	let issue = document.getElementById('newissue');
	let adduser = document.getElementById('adduser');
	let logout = document.getElementById('logout');



	home.addEventListener('click', () => {
		this.console.log("home clicked");
	});


	issue.addEventListener('click', () => {
		this.console.log("btn-clicked");

		this.$('#center').load("new_issue.html ");
	});


	adduser.addEventListener('click', () => {
		this.console.log('userclicked');
		this.$('#center').load('new_user.html', () => {

			var newuser = document.getElementById('newuserbtn');
			var errorcolor = "#E45449";
			var first = document.getElementById('firstname');
			var last = document.getElementById('lastname');
			var pw = document.getElementById('password');
			var email = document.getElementById('email');
			var nameexp = /[a-z]/;
			var pwexp = /[a-zA-Z0-9]+/;
			var emailexp = /[a-zA-z0-9]+\\@[a-z]+\.[a-z]{3}/;
			// this.$.getScript("/scripts/js/bug_newuser.js");
			this.console.log(first);
			newuser.addEventListener('click', (e) => {
				e.preventDefault();
				this.$.ajax({
					type: 'POST',
					url:"scripts/php/bugMe.php",
					data:{'firstname':first.value,'lastname':last.value,'password':pw.value,
					'email':email.value,"new_userbtn":newuser.value},
					success:(data)=>{
						this.alert(data);
					},
					dataType:'html'

				});
				
				


			});
		});



	});

	logout.addEventListener('click', () => {
		window.location.href = "/";
	});

};