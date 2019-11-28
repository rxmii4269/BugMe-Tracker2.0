function Main(){
var errorcolor="#E45449";
var newuser=document.querySelector('#newuserbtn');
var first = document.getElementById('firstname');
var last = document.getElementById('lastname');
var pw = document.getElementById('password');
var email = document.getElementById('email');
var nameexp=/[a-z]/;
var pwexp =/[a-zA-Z0-9]+/;//need to fix[a-zA-z0-9]+\@[a-z]+\.[a-z]{3}
var emailexp=/[a-zA-z0-9]+\@[a-z]+\.[a-z]{3}/
//var newissue=document.querySelector('#new_issuebtn');

newuser.onclick=function(){
	
	
	if ((nameexp.test(first.value)&& nameexp.test(last.value) && emailexp.test(email.value))&&
		(pwexp.test(pw.value) && pw.value.length>=8)) {
		

	$.ajax({
		type:"POST",
		url:"database.php",
		data: $('#user').serialize(),
		success:function(data){alert (data)}


	});

alert('form validated');

	} else{
		if(nameexp.test(first.value)==false){
			var nt=document.getElementById('firstname');
			
			nt.style.backgroundColor=errorcolor;


		}
		if(nameexp.test(last.value)==false){
			var nt=document.getElementById('lastname');
			
			nt.style.backgroundColor=errorcolor;

		}

		if(emailexp.test(email.value)==false){
			var nt=document.getElementById('email');
			
			nt.style.backgroundColor=errorcolor;

		}
		if((pwexp.test(pw.value)==false || pw.value.length<8)){
			var nt=document.getElementById('password');
			
			nt.style.backgroundColor=errorcolor;


		}


		alert('not validated remember to fix reg expression');
	}
	//alert(email.value);
	//alert( first.value,last.value, pw.value, email.value);

}





		alert("loaded");
}


document.addEventListener("DOMContentLoaded",Main);
