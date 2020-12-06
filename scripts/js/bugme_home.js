"use strict";

window.onload = () => {
	let home = document.getElementById("home");
	let issue = document.getElementById("newissue");
	let addUser = document.getElementById("adduser");
	let logout = document.getElementById("logout");
	let cookieName = document.cookie.split("=")[1];
	let errorColor = "#E45449";
	let title = document.getElementById("title");
	let des = document.getElementById("description");
	let user = document.getElementById("user");
	let errorType = document.getElementById("error_type");
	let priority = document.getElementById("priority");
	let titleExp = /[a-zA-Z]+/;
	let desExp = /[a-zA-Z0-9]/;
	let userExp = /[a-zA-Z]+/;
	let priorityExp = /(Minor|Major|Critical)/;
	let errorTypeExp = /(Bug|Proposal|Task)/;
	let nameExp = /[a-z]+/;
	let pwExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	let emailExp = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{3}/;

	const createNewIssueButton = () => {
		let createNewIssueBtn = document.getElementById("create_new_issue");

		createNewIssueBtn.addEventListener("click", () => {
			$("#center").load("new_issue.html", function () {

				//ajax request to get assigned users and populate it into the assigned to field
				let userLst = document.getElementById("userlist");
				const newIssueFunction = () => {
					newIssue.addEventListener("click", function () {
						if (
							titleExp.test(title.value) &&
							desExp.test(des.value) &&
							userExp.test(user.value) &&
							priorityExp.test(priority.value) &&
							errorTypeExp.test(errorType.value)
						) {


							$.ajax({
								type: "POST",
								url: "/scripts/php/bugMe.php",
								data: {
									title: title.value,
									description: des.value,
									user: user.value,
									error_type: errorType.value,
									priority: priority.value,
									Submitbtn: newIssue.value
								},
								success: function () {

								}
							});
						} else {
							if (titleExp.test(title.value) === false) {
								title.style.backgroundColor = errorColor;
							}
							if (desExp.test(des.value) === false) {
								des.style.backgroundColor = errorColor;
							}
							if (userExp.test(user.value) === false) {
								user.style.backgroundColor = errorColor;
							}
							if (priorityExp.test(priority.value) === false) {
								priority.style.backgroundColor = errorColor;
							}

							if (errorTypeExp.test(errorType.value) === false) {
								errorType.style.backgroundColor = errorColor;
							}


						} // end of else statement
					}); // end of submit issue function
				};
				$.ajax({
					type: "POST",
					url: "/scripts/php/bugMe.php",
					data: {
						data: "data"
					},
					success: data => {

						userLst.innerHTML = data;
					}
				});
				let newIssue = document.getElementById("new_issuebtn");

				newIssueFunction();
			}); // end of  add issue event listener
		});
	};

	$("#center").load("home.html", () => {
		let resultsTable = document.getElementById("resultstable");
		let allBtn = document.getElementById("all");
		let openBtn = document.getElementById("open");
		let myTicketsBtn = document.getElementById("mytickets");

		function handleData(data) {
			resultsTable.innerHTML = data;
			let table = document.getElementById("issueTable");
			let tr = table.getElementsByTagName("tr");
			let td = "";
			let assignedto = "";
			let id = "";
			$("#issueTable tbody tr #issue").on("click", function () {
				id = $(this)
					.text()
					.substring(1, 3);

				$.ajax({
					type: "POST",
					url: "/scripts/php/bugMe.php",
					data: {
						"id": id
					},
					success: data => {
						let center = document.getElementById("center");
						center.innerHTML = data;
						let markAsClosed = document.getElementById("closedbtn");
						let markInProgress = document.getElementById("inprogressbtn");

						markAsClosed.addEventListener("click", () => {
							let id = $(this)
								.text()
								.substring(1, 3);

							$.ajax({
								type: "POST",
								url: "/scripts/php/bugMe.php",
								data: {
									markclosed: "Closed",
									"id": id
								},
								success: () => {

								}
							});
						});

						markInProgress.addEventListener("click", () => {
							let id = $(this)
								.text()
								.substring(1, 3);
							$.ajax({
								type: "POST",
								url: "/scripts/php/bugMe.php",
								data: {
									markinprogress: "In progress",
									"id": id
								},
								success: () => {
								}
							});
						});
					},
					dataType: "html"
				});
			});

			allBtn.addEventListener("click", () => {
				for (let i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[2];
					if (td) {
						tr[i].style.removeProperty("display");
					}
				}
			});

			openBtn.addEventListener("click", () => {
				for (let i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[2];
					if (td) {
						let txtValue = td.innerText;
						if (txtValue === openBtn.innerText) {
							tr[i].style.removeProperty("display");
						} else {
							tr[i].style.setProperty("display", "none");
						}
					}
				}
			});

			myTicketsBtn.addEventListener("click", () => {
				for (let i = 1; i < tr.length; i++) {
					assignedto = tr[i].getElementsByTagName("td")[3];
					if (assignedto) {
						let txtValue = assignedto.innerText.split(" ")[0];
						if (txtValue === cookieName) {
							tr[i].style.removeProperty("display");
						} else {
							tr[i].style.setProperty("display", "none");
						}
					}
				}
			});

			let statusType = document.getElementsByClassName("statusType");
			for (let i = 0; i < statusType.length; i++) {
				if (statusType[i].innerText === "OPEN") {
					statusType[i].classList.add("open");
					statusType[i].classList.remove("inprogress", "closed");
				} else if (statusType[i].innerText === "IN PROGRESS") {
					statusType[i].classList.add("inprogress");
					statusType[i].classList.remove("open", "closed");
				} else if (statusType[i].innerText === "CLOSED") {
					statusType[i].classList.add("closed");
					statusType[i].classList.remove("inprogress", "open");
				}
			}
		}


		$.ajax({
			type: "POST",
			url: "/scripts/php/bugMe.php",
			data: {
				loadTable: "issueTable"
			},
			success: data => {
				handleData(data);
			}
		});

		createNewIssueButton();
	});

	home.addEventListener("click", () => {

		$("#center").load("home.html", () => {
			let allbtn = document.getElementById("all");
			let openbtn = document.getElementById("open");
			let myTicketsbtn = document.getElementById("mytickets");
			let resultstable = document.getElementById("resultstable");
			const handleData = (data) => {
				resultstable.innerHTML = data;
				let table = document.getElementById("issueTable");
				let tr = table.getElementsByTagName("tr");
				let td = "";
				let assignedto = "";
				let id = "";

				$("#issueTable tbody tr #issue").on("click", function () {
					id = $(this)
						.text()
						.substring(1, 3);

					$.ajax({
						type: "POST",
						url: "/scripts/php/bugMe.php",
						data: {
							"id": id
						},
						success: data => {
							let center = document.getElementById("center");
							center.innerHTML = data;
							let markAsClosed = document.getElementById("closedbtn");
							let markInProgress = document.getElementById("inprogressbtn");

							markAsClosed.addEventListener("click", () => {
								let id = $(this)
									.text()
									.substring(1, 3);

								$.ajax({
									type: "POST",
									url: "/scripts/php/bugMe.php",
									data: {
										markclosed: "Closed",
										"id": id
									},
									success: () => {

									}
								});
							});

							markInProgress.addEventListener("click", () => {
								let id = $(this)
									.text()
									.substring(1, 3);
								$.ajax({
									type: "POST",
									url: "/scripts/php/bugMe.php",
									data: {
										markinprogress: "In progress",
										"id": id
									},
									success: () => {
									}
								});
							});
						},
						dataType: "html"
					});
				});

				allbtn.addEventListener("click", () => {
					for (let i = 1; i < tr.length; i++) {
						td = tr[i].getElementsByTagName("td")[2];
						if (td) {
							tr[i].style.removeProperty("display");
						}
					}
				});

				openbtn.addEventListener("click", () => {
					for (let i = 1; i < tr.length; i++) {
						td = tr[i].getElementsByTagName("td")[2];
						if (td) {
							let txtValue = td.innerText;
							if (txtValue === openbtn.innerText) {
								tr[i].style.display = "";
							} else {
								tr[i].style.display = "none";
							}
						}
					}
				});

				myTicketsbtn.addEventListener("click", () => {
					for (let i = 1; i < tr.length; i++) {
						assignedto = tr[i].getElementsByTagName("td")[3];
						if (assignedto) {
							let txtValue = assignedto.innerText.split(" ")[0];
							if (txtValue === cookieName) {
								tr[i].style.display = "";
							} else {
								tr[i].style.display = "none";
							}
						}
					}
				});

				let statusType = document.getElementsByClassName("statusType");
				for (let i = 0; i < statusType.length; i++) {
					if (statusType[i].innerText === "OPEN") {
						statusType[i].classList.add("open");
						statusType[i].classList.remove("inprogress", "closed");
					} else if (statusType[i].innerText === "IN PROGRESS") {
						statusType[i].classList.add("inprogress");
						statusType[i].classList.remove("open", "closed");
					} else if (statusType[i].innerText === "CLOSED") {
						statusType[i].classList.add("closed");
						statusType[i].classList.remove("inprogress", "open");
					}
				}
			};

			$.ajax({
				type: "POST",
				url: "/scripts/php/bugMe.php",
				data: {
					loadTable: "issueTable"
				},
				success: data => {
					handleData(data);

				}
			});

			createNewIssueButton();
		});
	});
	//------------------------------------------------------------------------------------------------

	issue.addEventListener("click", () => {
		let data = "data";

		$("#center").load("new_issue.html ", function () {

			//ajax request to get assigned users and populate it into the assigned to field
			let userLst = document.getElementById("userlist");
			const newIssueFunction = () => {
				let title = document.getElementById("title");
				let des = document.getElementById("description");
				let user = document.getElementById("user");
				let errorType = document.getElementById("error_type");
				let priority = document.getElementById("priority");
				newIssue.addEventListener("click", function () {
					if (
						titleExp.test(title.value) &&
						desExp.test(des.value) &&
						userExp.test(user.value) &&
						priorityExp.test(priority.value) &&
						errorTypeExp.test(errorType.value)
					) {


						$.ajax({
							type: "POST",
							url: "/scripts/php/bugMe.php",
							data: {
								title: title.value,
								description: des.value,
								user: user.value,
								error_type: errorType.value,
								priority: priority.value,
								Submitbtn: newIssue.value
							},
							success: function () {

							}
						});
					} else {
						if (titleExp.test(title.value) === false) {
							title.style.backgroundColor = errorColor;
						}
						if (desExp.test(des.value) === false) {
							des.style.backgroundColor = errorColor;
						}
						if (userExp.test(user.value) === false) {
							user.style.backgroundColor = errorColor;
						}
						if (priorityExp.test(priority.value) === false) {
							priority.style.backgroundColor = errorColor;
						}

						if (errorTypeExp.test(errorType.value) === false) {
							errorType.style.backgroundColor = errorColor;
						}


					} // end of else statement
				}); // end of submit issue function
			};
			$.ajax({
				type: "POST",
				url: "/scripts/php/bugMe.php",
				data: {
					data: data
				},
				success: data => {

					userLst.innerHTML = data;
				}
			});
			let newIssue = document.getElementById("new_issuebtn");
			newIssueFunction();
		}); // end of  add issue event listener
	});

	//---------------------------------------------------------------------------
	addUser.addEventListener("click", () => {
		$("#center").load("new_user.html", () => {
			let newuser = document.querySelector("#newuserbtn");
			let first = document.getElementById("firstname");
			let last = document.getElementById("lastname");
			let pw = document.getElementById("password");
			let email = document.getElementById("email");


			newuser.addEventListener("click", function () {
				let nt = document.getElementById("firstname");

				if (
					nameExp.test(first.value) &&
					nameExp.test(last.value) &&
					emailExp.test(email.value) &&
					pwExp.test(pw.value) &&
					pw.value.length >= 8
				) {
					$.ajax({
						type: "POST",
						url: "scripts/php/bugMe.php",
						data: {
							firstname: first.value,
							lastname: last.value,
							password: pw.value,
							email: email.value,
							new_userbtn: newuser.value
						},
						success: function () {

						}
					});


				} else {
					if (nameExp.test(first.value) === false) {
						nt.style.backgroundColor = errorColor;
					}
					if (nameExp.test(last.value) === false) {
						nt = document.getElementById("lastname");

						nt.style.backgroundColor = errorColor;
					} else {
						if (emailExp.test(email.value) === false) {
							nt = document.getElementById("email");

							nt.style.backgroundColor = errorColor;
						}
						if (pwExp.test(pw.value) === false || pw.value.length < 8) {
							nt = document.getElementById("password");

							nt.style.backgroundColor = errorColor;
						}


					} // closing else
				}


			}); // closing else
		}); // close load newuser even listener
	}); //close adduser event listener

	logout.addEventListener("click", () => {
		$.ajax({
			type: "POST",
			url: "/scripts/php/bugMe.php",
			data: {
				logout: "logout"
			},
			success: () => {
				window.location.href = "/";
			}
		});
	});
};