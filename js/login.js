ingresar.addEventListener("click", () => {
    
    if(email.value !== "" && password.value !== ""){
        window.location.href = "indexxx.html";
    }else{
        alert("Complete los datos");
    }

    localStorage.setItem("Usuario", email.value);
});

document.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem("Usuario") != null){
        window.location.href = "indexxx.html";
    }
});