let mainContainer = document.getElementById("profile-flex-content");
let startParameters = document.getElementById("profile-flex-content").innerHTML;


/**************** PARAMETRES  ****************/
// ECOUTE SUR LE BOUTON PARAMETRE ET AFFICHE LES DONNEES
let accountParametersButton = document.getElementById("parameters-link");
accountParametersButton.addEventListener('click', function(){
    mainContainer.innerHTML = startParameters;
})


/***************** MES CREATIONS *********************/
let creationButton = document.getElementById('mycocktails-link');
let createdCocktails = [];

// RECUPERER LES COCKTAILS D'UN UTILISATEUR
function fetchCocktailsByUser (){
    return fetch('/profile/createdcocktail', {
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

function showCreatedCocktails(){
    mainContainer.textContent = "";
    const title = document.createElement('h2')
    title.textContent = 'Vos créations :'
    mainContainer.appendChild(title);
    if(createdCocktails.length > 0){
        const cocktailContainer = document.createElement('div');
        cocktailContainer.classList.add('cocktails');
        cocktailContainer.classList.add('cocktails-container');

        createdCocktails.forEach(cocktail => {
            const createdCocktail = document.createElement('a');
            createdCocktail.classList.add('cocktails-container-item');
            createdCocktail.href = `/cocktail/${cocktail.id}`;
            const cocktailTitle = document.createElement('h3');
            cocktailTitle.classList.add('cocktail-title');
            cocktailTitle.textContent = cocktail.name;
            const cocktailPicture = document.createElement('div')
            cocktailPicture.classList.add('cocktail-img');
            cocktailPicture.style = `background-image: url('/images/${cocktail.picture} `;
            cocktailPicture.alt = `Image de ${cocktail.name}`;

            createdCocktail.appendChild(cocktailTitle);
            createdCocktail.appendChild(cocktailPicture);

            cocktailContainer.appendChild(createdCocktail);

            mainContainer.appendChild(cocktailContainer);
        })
    } else {
        const emptyMessage = document.createElement('div')
        emptyMessage.textContent = 'Rien à afficher ici !';
        mainContainer.appendChild(emptyMessage);
    }
}

creationButton.addEventListener('click', async function(){
    await fetchCocktailsByUser();
    showCreatedCocktails();
})
