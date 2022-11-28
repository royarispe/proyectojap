// Variables

const perfilForm = document.getElementById("form_perfil");
const primerNombreInput = document.getElementById("primerNombre");
const segundoNombreInput = document.getElementById("segundoNombre");
const primerApellidoInput = document.getElementById("primerApellido");
const segundoApellidoInput = document.getElementById("segundoApellido");
const emailInput = document.getElementById("emailPerfil");
const celularNumInput = document.getElementById("celularNum");

//Validar los campos.

function validaciones() {
    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    })();

    //Guardar en el almacenamiento local.
    perfilForm.addEventListener("submit", event =>{
        event.preventDefault();
        if (perfilForm.checkValidity() === true){
            let perfil = {
                primerNombre: primerNombreInput.value,
                segundoNombre: segundoNombreInput.value,
                primerApellido: primerApellidoInput.value,
                segundoApellido: segundoApellidoInput.value,
                email: emailInput.value,
                celular: celularNumInput.value,
            }
            localStorage.setItem("perfil", JSON.stringify(perfil));
        }
    });
}

function usuarioIngresado(){
    if(localStorage.getItem("Usuario") !== null){
        emailInput.value = localStorage.getItem("Usuario");
    }
    let infoPerfil = JSON.parse(localStorage.getItem("perfil"));
    if (infoPerfil !== null && localStorage.getItem("Usuario") === infoPerfil.email){
        primerNombreInput.value = infoPerfil.primerNombre;
        segundoNombreInput.value = infoPerfil.segundoNombre;
        primerApellidoInput.value = infoPerfil.primerApellido;
        segundoApellidoInput.value = infoPerfil.segundoApellido;
        celularNumInput.value = infoPerfil.celular;
    }
}


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("userShow").innerHTML = localStorage.getItem("Usuario");

    cerrar.addEventListener("click", ()=>{
        localStorage.removeItem("Usuario");
        window.location = "index.html";
    });

    validaciones();
    usuarioIngresado();
});
