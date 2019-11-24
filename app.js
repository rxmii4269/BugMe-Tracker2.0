"use strict";

window.onload = () => {
    let submit = this.document.getElementById();

    submit.addEventListener('click',()=>{

        this.$.ajax({
            type:"POST",
            url: "",
            data: {},
            success:(data) =>{
                let result = document.getElementById("result");
                result.innerHTML = data;
            }
        });

    });
};