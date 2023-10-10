let mainContainer = document.getElementById("profile-flex-content");
let startParameters = document.getElementById("profile-flex-content").innerHTML;


/**************** PARAMETRES  ****************/
// ECOUTE SUR LE BOUTON PARAMETRE ET AFFICHE LES DONNEES
let accountParametersButton = document.getElementById("parameters-link");
accountParametersButton.addEventListener('click', function(){
    mainContainer.innerHTML = startParameters;
})


/**************** FAVORIS  ****************/
// RECUPERER LES COCKTAILS FAVORIS
let favouritesButton = document.getElementById("favourite-link");
let favouriteCocktails = [];

function fetchFavouriteCocktails (){
    return fetch('/profile/favourites', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok){
            throw new Error('la requete a échoué')
        }
        return response.json();
    })
    .then(data => {
        favouriteCocktails = data;
    })
    .catch(error => {
        console.error('Erreur', error)
})};

// BOUCLER SUR LES COCKTAILS FAVORIS ET LES AFFICHER
function showFavouriteCocktails(){
    mainContainer.textContent = "";
    const title = document.createElement('h2')
    title.textContent = 'Vos cocktails préférés :'
    mainContainer.appendChild(title);
    if(favouriteCocktails.length > 0){
        const cocktailContainer = document.createElement('div');
        cocktailContainer.classList.add('cocktails');
        cocktailContainer.classList.add('cocktails-container');
        cocktailContainer.style.justifyContent = "left";

        favouriteCocktails.forEach(cocktail => {
            const likedCocktail = document.createElement('a');
            likedCocktail.classList.add('cocktails-container-item');
            likedCocktail.href = `/cocktail/${cocktail.id}`;
            const cocktailTitle = document.createElement('h3');
            cocktailTitle.classList.add('cocktail-title-mini');
            cocktailTitle.textContent = cocktail.name;
            const cocktailPicture = document.createElement('div')
            cocktailPicture.classList.add('cocktail-mini');
            cocktailPicture.style = `background-image: url('/images/${cocktail.picture} `;
            cocktailPicture.alt = `Image de ${cocktail.name}`;

            likedCocktail.appendChild(cocktailTitle);
            likedCocktail.appendChild(cocktailPicture);

            cocktailContainer.appendChild(likedCocktail);

            mainContainer.appendChild(cocktailContainer);
        })
    } else {
        const emptyMessage = document.createElement('div')
        emptyMessage.textContent = 'Rien à afficher ici !';
        mainContainer.appendChild(emptyMessage);
    }
}

// ECOUTE SUR LE BOUTON FAVORIS
favouritesButton.addEventListener('click', async function(){
    await fetchFavouriteCocktails();
    showFavouriteCocktails();
})
