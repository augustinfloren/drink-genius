let favouritesButton = document.getElementById("mycocktails-link");
let mainContainer = document.getElementById("main-container-profile");
let favouriteCocktails = [];


// RECUPERER LES INGREDIENTS ALEATOIRES
function fetchFavouriteCocktails (){
    fetch('/profile/favourites', {
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
        console.log(data)
        favouriteCocktails = data;
    })
    .catch(error => {
        console.error('Erreur', error)
})};


favouritesButton.addEventListener('click', function(){
    fetchFavouriteCocktails();
    favouriteCocktails.forEach(cocktail => {
        const likedCocktail = document.createElement('div');
        likedCocktail.classList.add('favourite-cocktail');
        likedCocktail.textContent = cocktail.name;
        mainContainer.appendChild(likedCocktail);
    })
})

