// const mangaURL1233 = 'https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=0&sort=ratingRank'
const baseURL = 'https://api.pokemontcg.io/v2/cards?pageSize=20&q=nationalPokedexNumbers:[1 TO 20]'
const searchMangaURL = 'https://kitsu.io/api/edge/manga'

const containerMangas = document.getElementById('container-mangas')
const btnBuscar = document.getElementById('btnBuscar')
const inputBuscar = document.getElementById('inputBuscar')

// btnBuscar.addEventListener('click', searchMangas)

const token = localStorage.getItem('token')



console.log(token)

if (token == null) {
    alert('Logueate para poder comprar')

    window.location = ('./login.html')
    
} else {



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
        responseCartas(data);
        console.log(data)
        
        
    } catch( error ) {
        alert(error);
    }
    
};



const responseCartas = (cartas) => {
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


         const divPrecioComprar = document.createElement('div')
         divPrecioComprar.className = ('d-flex')
         
        
             

         const btnComprar = document.createElement('a')
         btnComprar.className = ('btn')
         
         btnComprar.innerText = "Comprar"
         
         const precio = document.createElement('h5')
         precio.className = ('card-title')
         precio.innerText = "Precio: $"+carta.cardmarket.prices.avg1;

         

         
         
         divSetCarta.appendChild(series)
         divSetCarta.appendChild(seriesSetName)
         rarezaNumero.appendChild(rareza)
         rarezaNumero.appendChild(span1)
         rarezaNumero.appendChild(numeroCarta)
         divPrecioComprar.appendChild(precio)
         divPrecioComprar.appendChild(btnComprar)
         cardBody.appendChild(cardTitle)
         cardBody.appendChild(divTipos)
         cardBody.appendChild(divSetCarta)
         cardBody.appendChild(rarezaNumero)
         cardBody.appendChild(divPrecioComprar)
         containerCard.appendChild(img)
         containerCard.appendChild(cardBody)
         containerCards.appendChild(containerCard);
         containerMangas.appendChild(containerCards)

         containerCards.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4')
         containerCard.classList.add('card')
         btnComprar.classList.add('btn-sm', 'btn-primary')
         precio.classList.add('precio-carta')
         tipo0.classList.add('card-text')
         divPrecioComprar.classList.add('justify-content-between')

        
        
         
     });

     
 }


getCartas()

}