"use strict";


window.onload = () => {

	let home = document.getElementById('home');
	let issue = document.getElementById('newissue');


	home.addEventListener('click',()=>{
		this.console.log("home clicked");
	});


	issue.addEventListener('click', () => {
		this.console.log("btn-clicked");

		this.$('#center').load("new_issue.html #center");
	});



};