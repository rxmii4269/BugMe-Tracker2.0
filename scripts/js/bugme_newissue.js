window.onload = () => {
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
	//alert("sub user");

	if( titleexp.test(title.value)&& desexp.test(des.value)&& 
		userexp.test(user.value)&&priorityexp.test(priority.value)&&errortypeexp.test(errortype.value)){
		alert('yes');
	$.ajax({
		type:"POST",
		url:"database.php",
		data: $("#create_issue").serialize(),
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



	}
	alert("loaded");
	
};


//document.addEventListener("DOMContentLoaded",Main);
