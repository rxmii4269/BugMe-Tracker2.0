"use strict";

window.onload =()=>{
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let submit = document.getElementById('submit');
    let result = document.getElementById('result');


    let forms = document.querySelectorAll('form');
    for (let i = 0;i<forms.length;i++){
        forms[i].setAttribute('novalidate',true);
    }


    this.$("#login_form").submit((e)=>{
        e.preventDefault();
    });

    
    submit.addEventListener( 'click',() =>{
        
        this.$.ajax({
            type: "POST",
            url: "scripts/php/bugMe.php",
            data:{'email':email.value,'password':password.value},
            success:(data)=>{
                result.innerHTML = data;
            },
            dataType: "html"

        });


    });

};