let mainContainer = document.getElementById("profile-main-container");
let startParameters = document.getElementById("profile-main-container").innerHTML;


/**************** PARAMETRES  ****************/
// ECOUTE SUR LE BOUTON PARAMETRE ET AFFICHE LES DONNEES
let accountParametersButton = document.getElementById("parameters-link");
accountParametersButton.addEventListener('click', function(){
    mainContainer.innerHTML = startParameters;
})


/**************** FAVORIS  ****************/
// RECUPERER LES INGREDIENTS ALEATOIRES
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
    favouriteCocktails.forEach(cocktail => {
        const likedCocktail = document.createElement('div');
        likedCocktail.classList.add('favourite-cocktail');
        likedCocktail.textContent = cocktail.name;
        mainContainer.appendChild(likedCocktail);
    })
}

// ECOUTE SUR LE BOUTON FAVORIS
favouritesButton.addEventListener('click', async function(){
    await fetchFavouriteCocktails();
    showFavouriteCocktails();
})


/***************** MES CREATIONS *********************/
let creationButton = document.getElementById('mycocktails-link');
let createdCocktails = [];

// RECUPERER LES COCKTAILS D'UN UTILISATEUR
function fetchCocktailsByUser (user_id){
    return fetch(`/profile/cocktail/${user_id}`, {
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
        createdCocktails = data;
    })
    .catch(error => {
        console.error('Erreur', error)
    })};

creationButton.addEventListener('click', function(){
    mainContainer.textContent = "";
    // NE FONCTIONNE PAS, COMMENT RECUPERER L'ID DE L'UTILISATEUR?
    const user_id = locals.user.id;
    fetchCocktailsByUser(user_id);
    console.log(createdCocktails);

})


/***************** NOUVEAU COCKTAIL *****************/
// AFFICHER LA PAGE POUR PROPOSER UN NOUVEAU COCKTAIL
let newCocktailButton = document.getElementById('newcocktail-link');

// CREATION DU FORMULAIRE
function createForm(){
    const cocktailForm = document.createElement('form');
    cocktailForm.id = "new-cocktail-form";

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'cocktail_name';
    nameInput.placeholder = 'Nom du cocktail';

    const instructionInput = document.createElement('input');
    instructionInput.type = 'text';
    instructionInput.name = 'cocktail_instruction';
    instructionInput.placeholder = 'Instructions du cocktail';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'new-cocktail-button'
    submitButton.textContent = 'Envoyer'

    cocktailForm.appendChild(nameInput);
    cocktailForm.appendChild(instructionInput);
    cocktailForm.appendChild(submitButton);
    
    mainContainer.textContent = '';
    mainContainer.appendChild(cocktailForm);
};

newCocktailButton.addEventListener('click', function(){
    createForm();
});


/******* SOUMETTRE LES DONNEES DU NOUVEAU COCKTAIL *************/
let submitButton = document.getElementById('new-cocktail-button');
submitButton.addEventListener('click', function(event){
    event.preventDefault();
    const cocktailForm = getElementById('new-cocktail-form');
    console.log(cocktailForm);
/*     cocktailForm.forEach(input => { 
        
    })*/
})

