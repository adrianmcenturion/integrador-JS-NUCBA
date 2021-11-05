// const mangaURL1233 = 'https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=0&sort=ratingRank'
const baseURL = 'https://api.pokemontcg.io/v2/cards?pageSize=20&q=nationalPokedexNumbers:[1 TO 20]'
const searchMangaURL = 'https://kitsu.io/api/edge/manga'

const containerMangas = document.getElementById('container-mangas')
const btnBuscar = document.getElementById('btnBuscar')
const inputBuscar = document.getElementById('inputBuscar')

// btnBuscar.addEventListener('click', searchMangas)



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
         tipo0.className = ('card-text')
         tipo0.innerText = carta.types[0];

         if (carta.types > 0) {
            const tipo1 = document.createElement('p')
            tipo1.className = ('card-text')
            tipo1.innerText = carta.types[1];

            tipo1.classList.add(`tipo-${type}`)

            divTipos.appendChild(tipo1)
         }
         
         
             
        


         const btnComprar = document.createElement('a')
         btnComprar.className = ('btn')
         
         btnComprar.innerText = "Comprar"
         
         const precio = document.createElement('h5')
         precio.className = ('card-title')
         precio.innerText = "Precio: $"+carta.cardmarket.prices.avg1;

         

         divTipos.appendChild(tipo0)
         
         divSetCarta.appendChild(series)
         divSetCarta.appendChild(seriesSetName)
         rarezaNumero.appendChild(rareza)
         rarezaNumero.appendChild(span1)
         rarezaNumero.appendChild(numeroCarta)
         cardBody.appendChild(cardTitle)
         cardBody.appendChild(divSetCarta)
         cardBody.appendChild(rarezaNumero)
         cardBody.appendChild(divTipos)
         cardBody.appendChild(precio)
         cardBody.appendChild(btnComprar)
         containerCard.appendChild(img)
         containerCard.appendChild(cardBody)
         containerCards.appendChild(containerCard);
         containerMangas.appendChild(containerCards)

         containerCards.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4')
         containerCard.classList.add('card')
         btnComprar.classList.add('btn-sm', 'btn-primary')
         precio.classList.add('precio-carta')

         

        function checkTipo() {
            
        
        tipoCarta = carta.types

        tipoCartaLowerCase = tipoCarta.map(types => types.toLowerCase());
        
        console.log(tipoCartaLowerCase)



        tipoCartaLowerCase.forEach(agregarClasesTipo);



        function agregarClasesTipo( type) {
            if (tipoCartaLowerCase.length > 0) {
                tipo0.classList.add(`tipo-${type}`)
                
            } else {
                tipo0.classList.add(`tipo-${type}`)
            }
            
            
        }

        
        }

        






        // tipo.classList.add('"tipo-"${tipoCartas}')

        // function checkTipo () {

            
        //     if(tipo.innerText == "Grass") {
        //         tipo.classList.add('tipo-grass')
                
        //     }if (tipo.innerText == "Water") {
        //         tipo.classList.add('tipo-water')
                
        //     }if (tipo.innerText == "Psychic") {
        //         tipo.classList.add('tipo-psychic')
                
        //     }if (tipo.innerText == "Metal") {
        //         tipo.classList.add('tipo-metal')
                
        //     }if (tipo.innerText == "Lightning") {
        //         tipo.classList.add('tipo-lightning')
                
        //     }if (tipo.innerText == "Fire") {
        //         tipo.classList.add('tipo-fire')
                
        //     }if (tipo.innerText == "Fighting") {
        //         tipo.classList.add('tipo-fighting')
                
        //     }if (tipo.innerText == "Fairy") {
        //         tipo.classList.add('tipo-fairy')
                
        //     }if (tipo.innerText == "Dragon") {
        //         tipo.classList.add('tipo-dragon')
                
        //     }if (tipo.innerText == "Darkness") {
        //         tipo.classList.add('tipo-darkness')
                
        //     }if (tipo.innerText == "Colorless") {
        //         tipo.classList.add('tipo-colorless')
                
        //     }
        // }

        setTimeout(checkTipo, 1000);
        

         

         
         
     });

     
 }



// const getMangas = async () => {
//     try {

//         const response = await fetch(mangaURL, {
//             method: 'GET'
//         });

//         const json = await response.json();
//         const { data } = json;
//         renderMangas(data);
//         console.log(data)
//         console.log(response.json.data)
//     } catch( error ) {
//         alert(error);
//     }
    
// };

// const renderMangas = (mangas) => {
//     mangas.forEach(manga => {
//          const containerCards = document.createElement('div');
//          containerCards.className = ('containerCards')
         
//          const containerCard = document.createElement('div');
//          containerCard.className = ('containerCard')
         
//          const img = document.createElement('img');
//          img.src = manga.attributes.posterImage.medium;
//          img.alt = manga.attributes.canonicalTitle;

//          const cardBody = document.createElement('div')
//          cardBody.className = ('card-body')

//          const cardTitle = document.createElement('h3')
//          cardTitle.className = ('card-title')
//          cardTitle.innerText = manga.attributes.canonicalTitle;

//          const cardText = document.createElement('p')
//          cardText.className = ('card-text')
//          cardText.innerText = manga.attributes.synopsis;

//          const btnComprar = document.createElement('a')
//          btnComprar.className = ('btn')
         
//          btnComprar.innerText = "Comprar"
         
//          const btnDetalles = document.createElement('a')
//          btnDetalles.className = ('btn')
         
//          btnDetalles.innerText = "Detalles"

         



//          cardBody.appendChild(cardTitle)
//          cardBody.appendChild(cardText)
//          cardBody.appendChild(btnComprar)
//          cardBody.appendChild(btnDetalles)
//          containerCard.appendChild(img)
//          containerCard.appendChild(cardBody)
//          containerCards.appendChild(containerCard);
//          containerMangas.appendChild(containerCards)

//          containerCards.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4')
//          containerCard.classList.add('card')
//          btnComprar.classList.add('btn-sm', 'btn-primary')
//          btnDetalles.classList.add('btn-sm', 'btn-secondary')

         
         
//      });

     
//  }

getCartas()

// function searchMangas () {

//     const getMangas = async () => {
//         try {
    
//             const response = await fetch(searchMangaURL, {
//                 method: 'GET'
//             });
    
//             const json = await response.json();
//             const { data } = json;
//             renderMangas(data);
//             console.log(data)
//             console.log(data.attributes)
            
//         } catch( error ) {
//             alert(error);
//         }
        
        
        
//     };
//     alert('asdasd')
    
// }