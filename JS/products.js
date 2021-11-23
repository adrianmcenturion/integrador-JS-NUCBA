// const mangaURL1233 = 'https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=0&sort=ratingRank'
const baseURL = 'https://api.pokemontcg.io/v2/cards?pageSize=20&q=nationalPokedexNumbers:[1 TO 20]'


const containerCartas = document.getElementById('container-cartas')
const btnBuscar = document.getElementById('btnBuscar')
const inputBuscar = document.getElementById('inputBuscar')
const iniciarSesion = document.getElementById('iniciarSesion')
const cerrarSesion = document.getElementById('cerrarSesion')
const containerCarrito = document.getElementById('containerCarrito')
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra')




const token = localStorage.getItem('token')



const cantidadAComprar = []
let carrito = []

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
        img.src = carta.images.large;
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
            precio.innerText = "$"+carta.cardmarket.prices.avg1;
            
            
            // const restar = document.createElement('h5')
            // restar.className = ('restar')
            // restar.innerText = "-"
            
            
            // const sumar = document.createElement('h5')
            // sumar.className = ('sumar')
            // sumar.innerText = "+"
            
            const btnComprar = document.createElement('a')
            btnComprar.className = ('btn') 
            btnComprar.innerText = "Añadir al carrito"
            
            const idCarta = document.createElement('p')
            idCarta.className = ('idCarta')
            idCarta.innerText = carta.id
            
            
            
            
            
            // divMiniPrecio.appendChild(restar)
            // divMiniPrecio.appendChild(cantidad)
            // divMiniPrecio.appendChild(sumar)
            divSetCarta.appendChild(series)
            divSetCarta.appendChild(seriesSetName)
            rarezaNumero.appendChild(rareza)
            rarezaNumero.appendChild(span1)
            rarezaNumero.appendChild(numeroCarta)
            divPrecio.appendChild(precio)
            // divPrecio.appendChild(divMiniPrecio)
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(divTipos)
            cardBody.appendChild(divSetCarta)
            cardBody.appendChild(rarezaNumero)
            cardBody.appendChild(divPrecio)
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
            // divMiniPrecio.classList.add('justify-content-around', 'divMiniComprar')
            // restar.classList.add('card-text')
            // sumar.classList.add('card-text')
            btnComprar.classList.add('btnComprar')
            
            // sumar.addEventListener('click', botonSumar)
            // restar.addEventListener('click', botonRestar)
        
            
        
            // function botonRestar () {
        
            //     if( restar.clicked = true && cantidad.value > 1) {
            //         cantidad.value--
            //         console.log(cantidad.value)
            //     } 
                
                
                
            // }
            // function botonSumar () {
                
            //     if(sumar.clicked = true) {
            //         cantidad.value++
                    
            //     }
                
            
            // }

             btnComprar.addEventListener('click', agregarAlCarrito)

        })
    }
    
    const getCartas = async () => {
        try {
    
            const response = await fetch(baseURL, {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'c6acf381-56e2-4fce-98d1-3dd72b80af18'
                }
            });
    
            const json = await response.json();
            const { data } = json;
            
            console.log(data)

            renderCartas(data)
            
            
            
            
        } catch( error ) {
            alert(error);
        }
        
    }

    // const renderCarrito = (cartas) => {
    //     cartas.forEach(carta => {

    //         const img = document.createElement('img');
    //         img.src = document.querySelector('img')
    //         img.alt = carta.name;
            
    //         const cardTitle = document.createElement('h3')
    //         cardTitle.className = ('card-title')
    //         cardTitle.innerText = carta.name;
            
    //         const divSetCarta = document.createElement('div')
    //         divSetCarta.className = ('divSetCartaCarrito')
            
    //         const series = document.createElement('p')
    //         series.innerText = carta.set.series;
            
    //         const seriesSetName = document.createElement('p')
    //         seriesSetName.innerText = carta.set.name;

    //         const cantidad = document.createElement('input')
    //         cantidad.type = "number"
    //         cantidad.value = `x${1}`

    //         const cantidadXPrecio = document.createElement('p')
    //         cantidadXPrecio.innerText = cantidad.value * carta.cardmarket.prices.avg1


    //         containerCarrito.appendChild(img)
    //         containerCarrito.appendChild(cardTitle)
    //         divSetCarta.appendChild(series)
    //         divSetCarta.appendChild(seriesSetName)
    //         containerCarrito.appendChild(divSetCarta)
    //         containerCarrito.appendChild(cantidad)
    //         containerCarrito.appendChild(cantidadXPrecio)


            
    //     });
    // }

    // const newItem = {
    //     img: 
    // }


    const agregarAlCarrito = (e) => {
        console.log('compraste')

        const button = e.target
        const item = button.closest('.containerCard')
        const itemTitle = item.querySelector('.card-title').textContent
        const itemPrecio = item.querySelector('.precio-carta').textContent.replace('$','');
        console.log(itemPrecio)
        const itemImg = item.querySelector('img').src
        const itemId = item.querySelector('.idCarta').textContent
        
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
        console.log(inputElement)

        for (let index = 0; index < carrito.length; index++) {
            if (carrito[index].id === newItem.id) {
                carrito[index].cantidad++;
                const inputValue = inputElement[index]
                
                inputValue.value++
                
                
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





    //     responseCartas = (cartas) => {
        //         responseCartas.forEach(carta => {
            //             const containerCards = document.createElement('div');
            //             containerCards.className = ('containerCards')
            
            //             const containerCard = document.createElement('div');
            //             containerCard.className = ('containerCard')
            
            //             const img = document.createElement('img');
            //             img.src = carta.images.large;
            //             img.alt = carta.name;
            
            //             const cardBody = document.createElement('div')
            //             cardBody.className = ('card-body')
            
            //             const cardTitle = document.createElement('h3')
            //             cardTitle.className = ('card-title')
            //             cardTitle.innerText = carta.name;
            
            //             const divSetCarta = document.createElement('div')
            //             divSetCarta.className = ('divSetCarta')
            
            //             const series = document.createElement('p')
            //             series.innerText = carta.set.series;
            
            //             const seriesSetName = document.createElement('p')
            //             seriesSetName.innerText = carta.set.name;
            
//             const rarezaNumero = document.createElement('div')
//             rarezaNumero.className = ('rarezaNumero')

//             const rareza = document.createElement('p')
//             rareza.className = ('card-text')
//             rareza.innerText = carta.rarity;

//             const span1 = document.createElement('span')
//             span1.innerText = ('-')

//             const numeroCarta = document.createElement('p')
//             numeroCarta.className = ('card-text')
//             numeroCarta.innerText = "#"+carta.number

//             const divTipos = document.createElement('div')
//             divTipos.className = ('divTipos')

//             const tipo0 = document.createElement('p')
//             tipo0.className = (`tipo${carta.types[0]}`)
//             tipo0.innerText = carta.types[0];

//             divTipos.appendChild(tipo0)

//             if (carta.types[1]) {
//                 const tipo1 = document.createElement('p')
//                 tipo1.className = (`tipo${carta.types[1]}`)
//                 tipo1.innerText = carta.types[1];

//                 tipo1.classList.add('card-text')
                
                
        
//                 divTipos.appendChild(tipo1)
//             }


//             const divPrecio = document.createElement('div')

//             divPrecio.className = ('d-flex')
            
            
//             const precio = document.createElement('h5')
//             precio.className = ('card-title')
//             precio.innerText = "$"+carta.cardmarket.prices.avg1;

//             const divMiniPrecio = document.createElement('div')
//             divMiniPrecio.className = ('d-flex')

//             const restar = document.createElement('h5')
//             restar.className = ('restar')
//             restar.innerText = "-"

//             const cantidad = document.createElement('input')
//             cantidad.type = "number"
//             cantidad.value = 1
            

//             const sumar = document.createElement('h5')
//             sumar.className = ('sumar')
//             sumar.innerText = "+"

//             const btnComprar = document.createElement('a')
//             btnComprar.className = ('btn') 
//             btnComprar.innerText = "Comprar"

//             const idCarta = []
//             idCarta.innerText = carta.id
            

            

            
//             divMiniPrecio.appendChild(restar)
//             divMiniPrecio.appendChild(cantidad)
//             divMiniPrecio.appendChild(sumar)
//             divSetCarta.appendChild(series)
//             divSetCarta.appendChild(seriesSetName)
//             rarezaNumero.appendChild(rareza)
//             rarezaNumero.appendChild(span1)
//             rarezaNumero.appendChild(numeroCarta)
//             divPrecio.appendChild(precio)
//             divPrecio.appendChild(divMiniPrecio)
//             cardBody.appendChild(cardTitle)
//             cardBody.appendChild(divTipos)
//             cardBody.appendChild(divSetCarta)
//             cardBody.appendChild(rarezaNumero)
//             cardBody.appendChild(divPrecio)
//             cardBody.appendChild(btnComprar)
//             containerCard.appendChild(img)
//             containerCard.appendChild(cardBody)
//             containerCards.appendChild(containerCard);
//             containerCartas.appendChild(containerCards)

//             containerCards.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4')
//             containerCard.classList.add('card')
//             btnComprar.classList.add('btn-sm', 'btn-primary')
//             precio.classList.add('precio-carta')
//             tipo0.classList.add('card-text')
//             divPrecio.classList.add('justify-content-between', 'divPrecio')
//             divMiniPrecio.classList.add('justify-content-around', 'divMiniComprar')
//             restar.classList.add('card-text')
//             sumar.classList.add('card-text')
//             btnComprar.classList.add('btnComprar')

            

//             sumar.addEventListener('click', botonSumar)
//             restar.addEventListener('click', botonRestar)

            

//             function botonRestar () {

//                 if( restar.clicked = true && cantidad.value > 1) {
//                     cantidad.value--
//                     console.log(cantidad.value)
//                 } 
                
                
                
//             }
//             function botonSumar () {
                
//                 if(sumar.clicked = true) {
//                     cantidad.value++
//                     console.log(cantidad.value)
//                 }
                
            
//             }
            
//             const comprar = () => {


                
//                 const arrayCarrito = [{
//                     imgCarrito: img.innerText,
//                     cardTitleCarrito: cardTitle.innerText,
//                     cantidadCarrito: cantidad.value,
//                     idCarrito: idCarta.innerText
//                 }]

//                 for (let index = 0; index < arrayCarrito.length; index++) {
                    
                    
                

//                 if (arrayCarrito.idCarrito === idCarta) {
//                     arrayCarrito.cantidadCarrito.value += cantidad.value
                    
//                 }else {

//                 console.log(arrayCarrito)



                
                
                


//                 const divCarrito = document.createElement('div')
//                 divCarrito.className = ('divCarrito')
                

//                 const imgCarrito = document.createElement('img')
//                 imgCarrito.className = ('imgCarrito')
//                 imgCarrito.src = img.src

//                 const cardTitleCarrito = document.createElement('h5')
//                 cardTitleCarrito.innerText = cardTitle.innerText

//                 const divSetCartaCarrito = document.createElement('div')
//                 divSetCartaCarrito.className = ('divSetCartaCarrito')

//                 const seriesCarrito = document.createElement('p')
//                 seriesCarrito.innerText = series.innerText;

//                 const seriesSetNameCarrito = document.createElement('p')
//                 seriesSetNameCarrito.innerText = seriesSetName.innerText;

//                 const divCantidadPrecio = document.createElement('div')
//                 divCantidadPrecio.className = ('divCantidadPrecio')

//                 const cantidadCarrito = document.createElement('h5')
//                 cantidadCarrito.innerText = `x${cantidad.value}`

//                 const sumaCantidadPrecio = document.createElement('h5')
//                 sumaCantidadPrecio.innerText = `$${cantidad.value * carta.cardmarket.prices.avg1}`

//                 console.log(precio.value)
//                 console.log(precio.innerText)

                

//                 divSetCartaCarrito.appendChild(seriesCarrito)
//                 divSetCartaCarrito.appendChild(seriesSetNameCarrito)
//                 divCantidadPrecio.appendChild(cantidadCarrito)
//                 divCantidadPrecio.appendChild(sumaCantidadPrecio)
//                 divCarrito.appendChild(imgCarrito)
//                 divCarrito.appendChild(cardTitleCarrito)
//                 divCarrito.appendChild(divSetCartaCarrito)
//                 divCarrito.appendChild(divCantidadPrecio)
//                 containerCarrito.appendChild(divCarrito)

//                 // arrayCarrito.push(idCarta.innerText, cantidad.value)

//                 // console.log(divCarrito.children[0][3].children[0].innerHTML)
                
//                 // console.log(arrayCarrito[1])

                

//             }
//         }
    
//     }
        
        
//         btnComprar.addEventListener('click', comprar)
            
//         });

    

//  }



getCartas()



cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location = ('./index.html')
})





