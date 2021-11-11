const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    email: false,
    password: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":

            validarCampo(expresiones.nombre, e.target, 'nombre')

        break;

        case "email":

            validarCampo(expresiones.email, e.target, 'email')

        break;

        case "password":

            validarCampo(expresiones.password, e.target, 'password')
            validarPassword2()

        break;

        case "password2":

        validarPassword2()
            
        break;
    }
}

const validarCampo = (expresion, input, campo) => {

    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto');
        document.getElementById(`i-${campo}`).classList.add('fa-check-circle');
        document.getElementById(`i-${campo}`).classList.remove('fa-times-circle');
        document.getElementById(`formulario-input-error-${campo}`).classList.remove('formulario-input-error-activo')
        campos[campo] = true
        
    } else {
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto')
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto')
        document.getElementById(`i-${campo}`).classList.add('fa-times-circle');
        document.getElementById(`i-${campo}`).classList.remove('fa-check-circle');
        document.getElementById(`formulario-input-error-${campo}`).classList.add('formulario-input-error-activo')
        campos[campo] = false
    }

}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password')
    const inputPassword2 = document.getElementById('password2')

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo-password2`).classList.add('formulario-grupo-incorrecto')
        document.getElementById(`grupo-password2`).classList.remove('formulario-grupo-correcto')
        document.getElementById(`i-password2`).classList.add('fa-times-circle');
        document.getElementById(`i-password2`).classList.remove('fa-check-circle');
        document.getElementById(`formulario-input-error-password2`).classList.add('formulario-input-error-activo')
        campos['password'] = false
        
    } else {
        document.getElementById(`grupo-password2`).classList.remove('formulario-grupo-incorrecto')
        document.getElementById(`grupo-password2`).classList.add('formulario-grupo-correcto')
        document.getElementById(`i-password2`).classList.remove('fa-times-circle');
        document.getElementById(`i-password2`).classList.add('fa-check-circle');
        document.getElementById(`formulario-input-error-password2`).classList.remove('formulario-input-error-activo')
        campos['password'] = true
        
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.email && campos.password) {
        formulario.reset()

    }
})