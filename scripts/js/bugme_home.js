"use strict";


window.onload = () => {

	let home = document.getElementById('home');
	let issue = document.getElementById('newissue');
	let adduser = document.getElementById('adduser');
	let logout = document.getElementById('');

	home.addEventListener('click', () => {
		this.console.log("home clicked");
	});


	issue.addEventListener('click', () => {
		this.console.log("btn-clicked");

		this.$('#center').load("new_issue.html ");
	});


	adduser.addEventListener('click', () => {
		this.console.log('userclicked');
		this.$('#center').load('new_user.html');
	});

	logout.addEventListener('click',()=>{
		this.$('#center').load('index.html');
	});

};