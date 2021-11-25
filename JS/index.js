const iniciarSesion = document.getElementById('iniciarSesion')
const cerrarSesion = document.getElementById('cerrarSesion')

const token = localStorage.getItem('token')
console.log(token)


if (token == null) {

    iniciarSesion.classList.remove('iniciarSesion')
    document.querySelector('.iniciaSesionIndexBTN').classList.remove('iniciaSesionIndexBTN-activo')
    document.querySelector('.iniciaSesionH3').classList.remove('iniciaSesionH3-activo')
    
} else {

    iniciarSesion.classList.add('iniciarSesion')
    cerrarSesion.classList.add('cerrarSesion-activo')
    cerrarSesion.classList.remove('cerrarSesion')
    document.querySelector('.iniciaSesionIndexBTN').classList.add('iniciaSesionIndexBTN-activo')
    document.querySelector('.iniciaSesionH3').classList.add('iniciaSesionH3-activo')

}


cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location = ('./index.html')
}) 