const mangaURL = 'https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=0&sort=ratingRank'
const searchMangaURL = 'https://kitsu.io/api/edge/manga'

const containerMangas = document.getElementById('container-mangas')
const btnBuscar = document.getElementById('btnBuscar')
const inputBuscar = document.getElementById('inputBuscar')

btnBuscar.addEventListener('click', searchMangas)







const getMangas = async () => {
    try {

        const response = await fetch(mangaURL, {
            method: 'GET'
        });

        const json = await response.json();
        const { data } = json;
        renderMangas(data);
        console.log(data)
    } catch( error ) {
        alert(error);
    }
    
};

const renderMangas = (mangas) => {
    mangas.forEach(manga => {
         const containerCards = document.createElement('div');
         containerCards.className = ('containerCards')
         
         const containerCard = document.createElement('div');
         containerCard.className = ('containerCard')
         
         const img = document.createElement('img');
         img.src = manga.attributes.posterImage.medium;
         img.alt = manga.canonicalTitle;

         const cardBody = document.createElement('div')
         cardBody.className = ('card-body')

         const cardTitle = document.createElement('h3')
         cardTitle.className = ('card-title')
         cardTitle.innerText = manga.attributes.canonicalTitle;

         const cardText = document.createElement('p')
         cardText.className = ('card-text')
         cardText.innerText = manga.attributes.synopsis;

         const btnComprar = document.createElement('a')
         btnComprar.className = ('btn')
         
         btnComprar.innerText = "Comprar"
         
         const btnDetalles = document.createElement('a')
         btnDetalles.className = ('btn')
         
         btnDetalles.innerText = "Detalles"

         



         cardBody.appendChild(cardTitle)
         cardBody.appendChild(cardText)
         cardBody.appendChild(btnComprar)
         cardBody.appendChild(btnDetalles)
         containerCard.appendChild(img)
         containerCard.appendChild(cardBody)
         containerCards.appendChild(containerCard);
         containerMangas.appendChild(containerCards)

         containerCards.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4')
         containerCard.classList.add('card')
         btnComprar.classList.add('btn-sm', 'btn-primary')
         btnDetalles.classList.add('btn-sm', 'btn-secondary')

         
         
     });

     
 }

getMangas()

function searchMangas () {

    const getMangas = async () => {
        try {
    
            const response = await fetch(searchMangaURL, {
                method: 'GET'
            });
    
            const json = await response.json();
            const { data } = json;
            renderMangas(data);
            console.log(data)
            console.log(data.attributes)
            
        } catch( error ) {
            alert(error);
        }
        
        
        
    };
    alert('asdasd')
    
}