"use strict";


window.onload = () => {

	let home = document.getElementById('home');
	let issue = document.getElementById('newissue');
	let adduser = document.getElementById('adduser');
	let logout = document.getElementById('logout');

	this.$('#center').load('home.html', () => {
		let resultstable = document.getElementById("resultstable");
		$.ajax({
			type: "POST",
			url: "/scripts/php/bugMe.php",
			data: {
				"loadTable": "issueTable"
			},
			success: (data) => {
				resultstable.innerHTML = data;
				
				let statusType = document.getElementById('statusType');
				alert(statusType.value);

			}

		});

		let createNewIssueBtn = document.getElementById("create_new_issue");

		createNewIssueBtn.addEventListener('click', () => {
			this.$('#center').load("new_issue.html ", function () {
				var errorcolor = "#E45449";
				var newissue = document.getElementById('new_issuebtn');
				var title = document.getElementById('title');
				var des = document.getElementById('description');
				var user = document.getElementById('user');
				var errortype = document.getElementById('error_type');
				var priority = document.getElementById('priority');
				var titleexp = /[a-zA-z]+/;
				var desexp = /[a-zA-z0-9]/;
				var userexp = /[a-zA-z]+/;
				var priorityexp = /(Minor|Major|Critical)/;
				var errortypeexp = /(Bug|Proposal|Task)/;
				let userlst = document.getElementById('userlist');

				//ajax request to get assigned users and populate it into the assigned to field
				$.ajax({
					type: "POST",
					url: "/scripts/php/bugMe.php",
					data: {
						"data": "data"
					},
					success: (data) => {
						// alert(data);
						userlst.innerHTML = data;
					}
				});



				newissue.addEventListener('click', function () {

					if (titleexp.test(title.value) && desexp.test(des.value) &&
						userexp.test(user.value) && priorityexp.test(priority.value) &&
						errortypeexp.test(errortype.value)) {
						alert('yes');


						$.ajax({
							type: "POST",
							url: "/scripts/php/bugMe.php",
							data: {
								'title': title.value,
								'description': des.value,
								'user': user.value,
								'error_type': errortype.value,
								'priority': priority.value,
								'Submitbtn': newissue.value
							},
							success: function (data) {
								alert(data);
							},


						});

					} else {
						if (titleexp.test(title.value) == false) {
							title.style.backgroundColor = errorcolor;

						}
						if (desexp.test(des.value) == false) {
							des.style.backgroundColor = errorcolor;

						}
						if (userexp.test(user.value) == false) {
							user.style.backgroundColor = errorcolor;
						}
						if (priorityexp.test(priority.value) == false) {
							priority.style.backgroundColor = errorcolor;
						}

						if (errortypeexp.test(errortype.value) == false) {
							errortype.style.backgroundColor = errorcolor;

						}

						alert("remember to fix reg expression");
					} // end of else statement
				}); // end of submit issue function 
			}); // end of  add issue event listener 
		});
	});




	home.addEventListener('click', () => {
		this.$('#center').load('home.html', () => {

			let resultstable = document.getElementById("resultstable");
			$.ajax({
				type: "POST",
				url: "/scripts/php/bugMe.php",
				data: {
					"loadTable": "issueTable"
				},
				success: (data) => {
					resultstable.innerHTML = data;



				}

			});


			let createNewIssueBtn = document.getElementById("create_new_issue");
			createNewIssueBtn.addEventListener('click', () => {
				this.$('#center').load("new_issue.html ", function () {
					var errorcolor = "#E45449";
					var newissue = document.getElementById('new_issuebtn');
					var title = document.getElementById('title');
					var des = document.getElementById('description');
					var user = document.getElementById('user');
					var errortype = document.getElementById('error_type');
					var priority = document.getElementById('priority');
					var titleexp = /[a-zA-z]+/;
					var desexp = /[a-zA-z0-9]/;
					var userexp = /[a-zA-z]+/;
					var priorityexp = /(Minor|Major|Critical)/;
					var errortypeexp = /(Bug|Proposal|Task)/;
					let userlst = document.getElementById('userlist');

					//ajax request to get assigned users and populate it into the assigned to field
					$.ajax({
						type: "POST",
						url: "/scripts/php/bugMe.php",
						data: {
							"data": "data"
						},
						success: (data) => {
							// alert(data);
							userlst.innerHTML = data;
						}
					});



					newissue.addEventListener('click', function () {

						if (titleexp.test(title.value) && desexp.test(des.value) &&
							userexp.test(user.value) && priorityexp.test(priority.value) &&
							errortypeexp.test(errortype.value)) {
							alert('yes');


							$.ajax({
								type: "POST",
								url: "/scripts/php/bugMe.php",
								data: {
									'title': title.value,
									'description': des.value,
									'user': user.value,
									'error_type': errortype.value,
									'priority': priority.value,
									'Submitbtn': newissue.value
								},
								success: function (data) {
									alert(data);
								},


							});

						} else {
							if (titleexp.test(title.value) == false) {
								title.style.backgroundColor = errorcolor;

							}
							if (desexp.test(des.value) == false) {
								des.style.backgroundColor = errorcolor;

							}
							if (userexp.test(user.value) == false) {
								user.style.backgroundColor = errorcolor;
							}
							if (priorityexp.test(priority.value) == false) {
								priority.style.backgroundColor = errorcolor;
							}

							if (errortypeexp.test(errortype.value) == false) {
								errortype.style.backgroundColor = errorcolor;

							}

							alert(" remember to fix reg expression");
						} // end of else statement
					}); // end of submit issue function 
				});


			});


		});


	});
	//------------------------------------------------------------------------------------------------

	issue.addEventListener('click', () => {
		let data = "data";




		this.$('#center').load("new_issue.html ", function () {
			var errorcolor = "#E45449";
			var newissue = document.getElementById('new_issuebtn');
			var title = document.getElementById('title');
			var des = document.getElementById('description');
			var user = document.getElementById('user');
			var errortype = document.getElementById('error_type');
			var priority = document.getElementById('priority');
			var titleexp = /[a-zA-z]+/;
			var desexp = /[a-zA-z0-9]/;
			var userexp = /[a-zA-z]+/;
			var priorityexp = /(Minor|Major|Critical)/;
			var errortypeexp = /(Bug|Proposal|Task)/;
			let userlst = document.getElementById('userlist');

			//ajax request to get assigned users and populate it into the assigned to field
			$.ajax({
				type: "POST",
				url: "/scripts/php/bugMe.php",
				data: {
					"data": data
				},
				success: (data) => {
					// alert(data);
					userlst.innerHTML = data;
				}
			});



			newissue.addEventListener('click', function () {

				if (titleexp.test(title.value) && desexp.test(des.value) &&
					userexp.test(user.value) && priorityexp.test(priority.value) &&
					errortypeexp.test(errortype.value)) {
					alert('yes');


					$.ajax({
						type: "POST",
						url: "/scripts/php/bugMe.php",
						data: {
							'title': title.value,
							'description': des.value,
							'user': user.value,
							'error_type': errortype.value,
							'priority': priority.value,
							'Submitbtn': newissue.value
						},
						success: function (data) {
							alert(data);
						},


					});

				} else {
					if (titleexp.test(title.value) == false) {
						title.style.backgroundColor = errorcolor;

					}
					if (desexp.test(des.value) == false) {
						des.style.backgroundColor = errorcolor;

					}
					if (userexp.test(user.value) == false) {
						user.style.backgroundColor = errorcolor;
					}
					if (priorityexp.test(priority.value) == false) {
						priority.style.backgroundColor = errorcolor;
					}

					if (errortypeexp.test(errortype.value) == false) {
						errortype.style.backgroundColor = errorcolor;

					}

					alert(" remember to fix reg expression");
				} // end of else statement







			}); // end of submit issue function 
		}); // end of  add issue event listener 

	});

	//---------------------------------------------------------------------------
	adduser.addEventListener('click', () => {

		this.$('#center').load('new_user.html', () => {

			var newuser = document.querySelector('#newuserbtn');
			var errorcolor = "#E45449";
			var first = document.getElementById('firstname');
			var last = document.getElementById('lastname');
			var pw = document.getElementById('password');
			var email = document.getElementById('email');
			var nameexp = /[a-z]+/;
			var pwexp = /[a-z]+/;
			var emailexp = /[a-zA-z0-9]+\@[a-z]+\.[a-z]{3}/;



			newuser.addEventListener("click", function () {

				var nt = document.getElementById('firstname');

				if (nameexp.test(first.value) && nameexp.test(last.value) &&
					emailexp.test(email.value) && pwexp.test(pw.value) &&
					(pw.value.length) >= 8) {

					$.ajax({
						type: 'POST',
						url: "scripts/php/bugMe.php",
						data: {
							'firstname': first.value,
							'lastname': last.value,
							'password': pw.value,
							'email': email.value,
							"new_userbtn": newuser.value
						},
						success: function (data) {
							alert(data);
						}

					});

					alert("validated");


				} else {

					if (nameexp.test(first.value) == false) {


						nt.style.backgroundColor = errorcolor;


					}
					if (nameexp.test(last.value) == false) {
						nt = document.getElementById('lastname');

						nt.style.backgroundColor = errorcolor;



					} else {

						if (emailexp.test(email.value) == false) {
							nt = document.getElementById('email');

							nt.style.backgroundColor = errorcolor;

						}
						if (pwexp.test(pw.value) == false || pw.value.length < 8) {
							nt = document.getElementById('password');

							nt.style.backgroundColor = errorcolor;
						}

						alert("not validated");
					} // closeing else

				}

				//alert("not validated");
			}); // closeing else


		}); // close load newuser even listener 


	}); //close adduser event listener










	logout.addEventListener('click', () => {
		this.$.ajax({
			type: "POST",
			url: "/scripts/php/bugMe.php",
			data: {
				'logout': "logout"
			},
			success: () => {
				window.location.href = "/";


			},
			error: () => {
				this.alert("ERROR");
			},
		});


	});

};