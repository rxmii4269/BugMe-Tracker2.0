"use strict";
window.onload = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let submit = document.getElementById('submit');
    let errorcolor = "#E45449";
    let normalcolor = '#FFFFFF';


    // let forms = document.querySelectorAll('form');
    // for (let i = 0; i < forms.length; i++) {
    //     forms[i].setAttribute('novalidate', true);
    // }



    submit.addEventListener('click', (e) => {
        e.preventDefault();

        if (email.value === '' && password.value === '') {
            email.style.backgroundColor = errorcolor;
            password.style.backgroundColor = errorcolor;
        } else if (email.value !== '' && password.value === '') {
            email.style.backgroundColor = normalcolor;
            password.style.backgroundColor = errorcolor;
        } else if (email.value === '' && password.value !== '') {
            email.style.backgroundColor = errorcolor;
            password.style.backgroundColor = normalcolor;
        } else {
            $.ajax({
                type: "POST",
                url: "scripts/php/bugMe.php",
                data: {
                    'email': email.value,
                    'password': password.value,
                    "login_submit": submit.value
                },
                success: (data) => {
                    handleData(data.trim());
                }
            });
            const handleData = (data) =>{
                if (data === 'success'){
                    window.location.href = 'dashboard.html'
                } else {
                    let error = document.getElementById('error');
                    error.innerText = data;
                }
            }

        }



    });
};