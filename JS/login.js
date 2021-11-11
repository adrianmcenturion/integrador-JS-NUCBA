const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            console.log('funciona');

            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById('grupo-nombre').classList.remove('formulario-grupo-incorrecto');
                document.getElementById('grupo-nombre').classList.add('formulario-grupo-correcto');
                document.querySelector('#grupo-nombre i').classList.add('fa-check-circle');
                document.querySelector('#grupo-nombre i').classList.remove('fa-times-circle');
                
            } else {
                document.getElementById('grupo-nombre').classList.add('formulario-grupo-incorrecto')
                document.getElementById('grupo-nombre').classList.remove('formulario-grupo-correcto')
                document.querySelector('#grupo-nombre i').classList.add('fa-times-circle');
                document.querySelector('#grupo-nombre i').classList.remove('fa-check-circle');
            }

        break;

        case "email":
            console.log('funciona');
        break;

        case "password":
            console.log('funciona');
        break;

        case "password2":
            console.log('funciona');
        break;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
})