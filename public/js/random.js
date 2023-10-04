let machine = document.getElementById("generator");
let generateRandomButton = document.querySelector(".generator-generate-btn");
let startMachine = machine.innerHTML;
let randomIngredients = [];
/* let softBox = document.getElementById("generator-virgin-option-label"); */


// RECUPERER DES INGREDIENTS ALEATOIRES ET LES AJOUTER DANS UN TABLEAU EXTERIEUR
function fetchRandomIngredients(){
return fetch('/random', {
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
    // Réinitialiser le tableau des ingrédients
    randomIngredients = [];
    data.forEach(ingredient => {
        randomIngredients.push(ingredient);
    });
})
.catch(error => {
    console.error('Erreur', error)
})}
;

// AJOUTER DES INGREDIENTS ALEATOIRES AU DOM
function addRandomIngredients(){
    machine.innerHTML = "";
    randomIngredients.forEach(ingredient => {
        const randomIngredientDiv = document.createElement('div');
        randomIngredientDiv.classList.add('random-ingredient');
        randomIngredientDiv.textContent =  ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
        machine.appendChild(randomIngredientDiv)
    });
};

// AJOUTER LE BOUTON DE RETOUR A LA PAGE PRINCIPAL
function addNewRandomIngredientsBtn(){
    const newRandomButton = document.createElement('button');
    newRandomButton.textContent = "Nouveau cocktail !";
    machine.appendChild(newRandomButton);

    newRandomButton.addEventListener('click', function(event){
        event.preventDefault();
        machine.innerHTML = startMachine;
        addGenerateRandomButtonEventListener();
    });
};

function addGenerateRandomButtonEventListener(){
    let generateRandomButton = document.querySelector(".generator-generate-btn");
    generateRandomButton.addEventListener('click', async function (event){
        event.preventDefault();
        await fetchRandomIngredients();
        addRandomIngredients();
        addNewRandomIngredientsBtn();
    })
}

// EVENEMENT SUR LE BOUTON DE GENERATION DE COCKTAIL ALEATOIRE
generateRandomButton.addEventListener('click', async function(event){
    event.preventDefault();
    await fetchRandomIngredients();
    addRandomIngredients();
    addNewRandomIngredientsBtn();
    addGenerateRandomButtonEventListener();
    });
