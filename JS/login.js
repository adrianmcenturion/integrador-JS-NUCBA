const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const baseURL = 'https://back-sandbox.herokuapp.com/api';
const btnSubmit = document.getElementById('btn-submit')
const password = document.getElementById('password')
const email = document.getElementById('email')

const token = null



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


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.email && campos.password) {
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

const login = async () => {

    const body = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const json = await response.json();

        const token = json.token

        console.log(token)
        
        console.log(json);
        
        const redirigir = () => {
            if (response.status == 200) {
                
                localStorage.setItem('token', token)
                window.location = './products.html';
                
            }
        }

        setTimeout(redirigir, 1500)



    } catch( error ) {
        alert('ERROR', error);
    }
}


    btnSubmit.addEventListener('click', login)

    