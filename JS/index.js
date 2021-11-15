const iniciarSesion = document.getElementById('iniciarSesion')
const cerrarSesion = document.getElementById('cerrarSesion')

const token = localStorage.getItem('token')
console.log(token)


if (token == null) {

    iniciarSesion.classList.remove('iniciarSesion')
    
} else {

    iniciarSesion.classList.add('iniciarSesion')
    cerrarSesion.classList.add('cerrarSesion-activo')
    cerrarSesion.classList.remove('cerrarSesion')

}


cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location = ('./index.html')
}) 