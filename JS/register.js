const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')
const password = document.getElementById('password')
const email = document.getElementById('email')
const nombre = document.getElementById('nombre')
const btnSubmit = document.getElementById('btn-submit')

const baseURL = 'https://back-sandbox.herokuapp.com/api'

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 6 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	
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


        document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo')
        setTimeout(() => {
            
            document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo')
        }, 4000)

        document.querySelectorAll('.formulario-grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario-grupo-correcto')
        })

    } else {
        document.getElementById('formulario-mensaje').classList.add('formulario-mensaje-activo')
    }
})

const postRequest = async () => {
    try {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value,
                "name": nombre.value,
                "lastName": nombre.value
                
            })
            
        });

        const json = await response.json();
        console.log(json);
        console.log(response.status)

        const redirigir = () => {
            if (response.status == 201) {
                
                window.location = './login.html';
                
            }
        }

        setTimeout(redirigir, 3000)

    } catch( error ) {

    }
}


    btnSubmit.addEventListener('click', postRequest)

