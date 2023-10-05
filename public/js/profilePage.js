let favouritesButton = document.getElementById("favourite-link");
let mainContainer = document.getElementById("profile-main-container");
let accountParameters = document.getElementById("parameters-link");
let favouriteCocktails = [];


// RECUPERER LES INGREDIENTS ALEATOIRES
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

function showFavouriteCocktails(){
    mainContainer.textContent = "";
    console.log(favouriteCocktails)
    favouriteCocktails.forEach(cocktail => {
        const likedCocktail = document.createElement('div');
        likedCocktail.classList.add('favourite-cocktail');
        likedCocktail.textContent = cocktail.name;
        mainContainer.appendChild(likedCocktail);
    })
}

favouritesButton.addEventListener('click', async function(){
    await fetchFavouriteCocktails();
    showFavouriteCocktails();
})

