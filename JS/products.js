

const containerCartas = document.getElementById('container-cartas')
const btnBuscar = document.getElementById('btnBuscar')
const inputBuscar = document.getElementById('inputBuscar')
const iniciarSesion = document.getElementById('iniciarSesion')
const cerrarSesion = document.getElementById('cerrarSesion')
const containerCarrito = document.getElementById('containerCarrito')
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra')
const btnAnterior = document.querySelector('.btnAnterior')
const btnSiguiente = document.querySelector('.btnSiguiente')
const inputPaginacion = document.querySelector('.inputPaginacion')





const token = localStorage.getItem('token')


let carrito = []
let dataCartas = []


console.log(token)




if (token == null) {
    alert('Logueate para poder comprar')
    
    window.location = ('./login.html')
    
}



iniciarSesion.classList.add('iniciarSesion')
cerrarSesion.classList.add('cerrarSesion-activo')
cerrarSesion.classList.remove('cerrarSesion')

const renderCartas = (cartas) => {
    cartas.forEach(carta => {
        
        const containerCards = document.createElement('div');
        containerCards.className = ('containerCards')
        
        const containerCard = document.createElement('div');
        containerCard.className = ('containerCard')
        
        const img = document.createElement('img');
        img.src = carta.images ? carta.images.large : 
        img.alt = carta.name;
        
        const cardBody = document.createElement('div')
        cardBody.className = ('card-body')
        
        const cardTitle = document.createElement('h3')
        cardTitle.className = ('card-title')
        cardTitle.innerText = carta.name;
        
        const divSetCarta = document.createElement('div')
        divSetCarta.className = ('divSetCarta')
        
        const series = document.createElement('p')
        series.innerText = carta.set.series;
        
        const seriesSetName = document.createElement('p')
        seriesSetName.innerText = carta.set.name;
        
        const rarezaNumero = document.createElement('div')
        rarezaNumero.className = ('rarezaNumero')
        
        const rareza = document.createElement('p')
        rareza.className = ('card-text')
        rareza.innerText = carta.rarity;
        
        const span1 = document.createElement('span')
        span1.innerText = ('-')
        
        const numeroCarta = document.createElement('p')
        numeroCarta.className = ('card-text')
        numeroCarta.innerText = "#"+carta.number
        
        const divTipos = document.createElement('div')
        divTipos.className = ('divTipos')
        
        const tipo0 = document.createElement('p')
        tipo0.className = (`tipo${carta.types[0]}`)
        tipo0.innerText = carta.types[0];
        
        divTipos.appendChild(tipo0)
        
        if (carta.types[1]) {
            const tipo1 = document.createElement('p')
                tipo1.className = (`tipo${carta.types[1]}`)
                tipo1.innerText = carta.types[1];
                
                tipo1.classList.add('card-text')
                
                
                
                divTipos.appendChild(tipo1)
            }
            
            
            const divPrecio = document.createElement('div')
            
            divPrecio.className = ('d-flex')
            
            
            const precio = document.createElement('h5')
            precio.className = ('card-title')
            

            if (carta.cardmarket) {
                precio.innerText = "$"+carta.cardmarket.prices.avg1  
            }else {
                precio.innerText = "$"+3.50
            }
            

            
            const btnComprar = document.createElement('a')
            btnComprar.className = ('btn') 
            btnComprar.innerText = "Añadir al carrito"

            const mensajeAgregadoCarrito = document.createElement('p')
            mensajeAgregadoCarrito.className = ('mensajeAgregadoCarrito')
            mensajeAgregadoCarrito.innerText = 'Agregado al carrito!'
            
            const idCarta = document.createElement('p')
            idCarta.className = ('idCarta')
            idCarta.innerText = carta.id
            
            

            divSetCarta.appendChild(series)
            divSetCarta.appendChild(seriesSetName)
            rarezaNumero.appendChild(rareza)
            rarezaNumero.appendChild(span1)
            rarezaNumero.appendChild(numeroCarta)
            divPrecio.appendChild(precio)
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(divTipos)
            cardBody.appendChild(divSetCarta)
            cardBody.appendChild(rarezaNumero)
            cardBody.appendChild(divPrecio)
            cardBody.appendChild(mensajeAgregadoCarrito)
            cardBody.appendChild(btnComprar)
            cardBody.appendChild(idCarta)
            containerCard.appendChild(img)
            containerCard.appendChild(cardBody)
            containerCards.appendChild(containerCard);
            containerCartas.appendChild(containerCards)
            
            containerCards.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'col-xs', 'mb-4')
            containerCard.classList.add('card', 'col')
            btnComprar.classList.add('btn-sm', 'btn-primary')
            precio.classList.add('precio-carta')
            tipo0.classList.add('card-text')
            divPrecio.classList.add('justify-content-between', 'divPrecio')

            btnComprar.classList.add('btnComprar')
            

             btnComprar.addEventListener('click', agregarAlCarrito)

        })
    }
    
    const getCartas = async () => {
        try {
            
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=${(inputPaginacion.value)}&pageSize=20`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'c6acf381-56e2-4fce-98d1-3dd72b80af18'
                }
            });
            
            const json = await response.json();
            const { data } = json;
            
            const paginacion = json.page
            console.log(paginacion)
            
            dataCartas = [json]
            console.log(json)
            console.log(dataCartas)
            console.log(dataCartas[0].data)

            renderCartas(data)

        

            console.log(data)

            
        } catch( error ) {
            alert(error);
        }
        
    }

    

    getCartas()

    function palabraABuscar () {
        pokemonABuscar = inputBuscar.value
        console.log(pokemonABuscar)
    }


    const buscarCartas = async () => {

        
        try {
    
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=100&q=name:${pokemonABuscar}*`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'c6acf381-56e2-4fce-98d1-3dd72b80af18'
                }
            });
    
            const json = await response.json();
            const dataBusqueda = json.data;


            const cantidadResultados = json.totalCount
            

            
            
            
            console.log(dataBusqueda)
            containerCartas.innerHTML = ''
            if (dataBusqueda.length === 0) {
                document.querySelector('.sinResultados').classList.add('sinResultados-activo')
                
            }else {
                document.querySelector('.sinResultados').classList.remove('sinResultados-activo')
                
                renderCartas(dataBusqueda)
                
            }
            
            



            

            
            
            
            
            
        } catch( error ) {
            alert(error);
        }

        
        
    }

    

    function paginaSiguiente () {
        
        inputPaginacion.value ++
        console.log(inputPaginacion.value)
        getCartas()
        containerCartas.innerHTML = ''
        renderCartas(dataCartas)
        
    }
    
    function paginaAnterior () {
        if (inputPaginacion.value > 1) {
            
            inputPaginacion.value --
            console.log(inputPaginacion.value)
            containerCartas.innerHTML = ''
            getCartas()
            renderCartas(dataCartas)
            
            
        }
    }


    btnSiguiente.addEventListener('click', paginaSiguiente)
    btnAnterior.addEventListener('click', paginaAnterior)

    



    inputBuscar.addEventListener('change', palabraABuscar)
    btnBuscar.addEventListener('click', buscarCartas)
    


    const agregarAlCarrito = (e) => {
        console.log('compraste')

        const button = e.target
        const item = button.closest('.containerCard')
        const itemTitle = item.querySelector('.card-title').textContent
        const itemPrecio = item.querySelector('.precio-carta').textContent.replace('$','');
        console.log(itemPrecio)
        const itemImg = item.querySelector('img').src
        const itemId = item.querySelector('.idCarta').textContent

        const mensajeCarrito = item.querySelector('.mensajeAgregadoCarrito')

        mensajeCarrito.classList.add('mensajeAgregadoCarrito-activo')

        function borrarClaseMensaje () {
            mensajeCarrito.classList.remove('mensajeAgregadoCarrito-activo')
        }
        setTimeout(borrarClaseMensaje, 1200)
        
        const newItem = {
            img: itemImg,
            title: itemTitle,
            cantidad: 1,
            precio: itemPrecio,
            id: itemId
        }

        agregarItemAlCarrito(newItem)

        

    }

    const agregarItemAlCarrito = (newItem) => {

        const inputElement = containerCarrito.getElementsByClassName('cantidadCarrito')
        const inputElementPrecio = containerCarrito.getElementsByClassName('precioCarrito')
        console.log(inputElement)
        console.log(inputElementPrecio)

        for (let index = 0; index < carrito.length; index++) {
            if (carrito[index].id === newItem.id) {
                carrito[index].cantidad++;
                const inputValue = inputElement[index]
                const inputValuePrecio = inputElementPrecio[index]
                
                
                inputValue.value++

                inputValuePrecio.innerText = `$${(inputValue.value * newItem.precio).toFixed(2)}`
                

                
                
                console.log(carrito)
                carritoTotal()

                return null
                
            }
            
        }

        carrito.push(newItem)
        renderCarrito(newItem)

        console.log(carrito)
    }


    const renderCarrito = () => {
        containerCarrito.innerHTML = ''

        carrito.map(item => {

            const divCarrito = document.createElement('div')
            divCarrito.className = ('divCarrito')
            
            const imgCarrito = document.createElement('img')
            imgCarrito.className = ('imgCarrito')
            imgCarrito.src = item.img

            const cardTitleCarrito = document.createElement('h3')
            cardTitleCarrito.className = document.createElement('card-title')
            cardTitleCarrito.innerText = item.title

            const cantidadCarrito = document.createElement('input')
            cantidadCarrito.className = ('cantidadCarrito')
            cantidadCarrito.value = item.cantidad

            const cantidadXPrecio = document.createElement('p')
            cantidadXPrecio.className = ('precioCarrito')
            cantidadXPrecio.innerText = `$${(cantidadCarrito.value * item.precio).toFixed(2)}`

            const idCarrito = document.createElement('p')
            idCarrito.className = ('idCarrito')
            idCarrito.innerText = item.id

            const btnBorrar = document.createElement('button')
            btnBorrar.className = ('btn')
            btnBorrar.innerText = "X"
            
            btnBorrar.classList.add('btn-secondary', 'btnBorrar')
            divCarrito.appendChild(imgCarrito)
            divCarrito.appendChild(cardTitleCarrito)
            divCarrito.appendChild(cantidadCarrito)
            divCarrito.appendChild(cantidadXPrecio)
            divCarrito.appendChild(idCarrito)
            divCarrito.appendChild(btnBorrar)
            containerCarrito.append(divCarrito)


            divCarrito.querySelector('.btnBorrar').addEventListener('click', removerItemCarrito)
            divCarrito.querySelector('.cantidadCarrito').addEventListener('change', sumaCantidad)


        })

        carritoTotal()

    }

    const removerItemCarrito = (e) => {
        const buttonDelete = e.target
        const divCarrito = buttonDelete.closest('.divCarrito')
        const id = divCarrito.querySelector('.idCarrito').textContent

        for (let index = 0; index < carrito.length; index++) {
            if (carrito[index].id === id) {
                carrito.splice(index, 1)
                
            }
            
        }
        divCarrito.remove()
        carritoTotal()

    }



    const sumaCantidad = (e) => {
        const sumaInput = e.target
        const divCarrito = sumaInput.closest('.divCarrito')
        const id = divCarrito.querySelector('.idCarrito').textContent
        console.log(id)
        carrito.forEach(item => {
            if(item.id === id){
                sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value
                item.cantidad = sumaInput.value
                console.log('son iguales')
                carritoTotal()
            }
        })
        console.log(carrito)
    }

    const carritoTotal = () => {
        let total = 0
        const itemCarritoTotal = document.querySelector('.total')
        console.log(document.querySelector('.total'))
        carrito.forEach(item => {
            const precio = Number(item.precio.replace("$", " "))
            total = total + precio * item.cantidad
        })

        itemCarritoTotal.innerHTML = `Total: $${total.toFixed(2)}`
        addLocalStorage()
    }
    

    function addLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }

    window.onload = function () {
        const storage = JSON.parse(localStorage.getItem('carrito'))
        if(storage) {
            carrito = storage
            renderCarrito()
        }
    }

    btnFinalizarCompra.addEventListener('click', finalizarCompra)

    function finalizarCompra() {
        console.log(carrito)
        if (carrito.length < 1) {

            alert('Agregue productos al carrito')
            
        } else {

        
        alert('Gracias por su compra!')
        carrito.length = 0
        console.log(carrito.length)
        renderCarrito()
        carritoTotal()
        localStorage.removeItem('carrito')

    }
        
    }


cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location = ('./index.html')
})





