
let machine = document.getElementById("generator");
let generateButton = document.querySelector(".generator-generate-btn");
let startMachine = machine.innerHTML;
let randomIngredients = [];
/* let softBox = document.getElementById("generator-virgin-option-label"); */

function fetchRandomIngredients(){
return fetch('/random', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (!response.ok){
        throw new Error('la requete a échoué')
    }
    return response.json();
}).then(data => {
    randomIngredients = [];
    data.forEach(ingredient => {
        randomIngredients.push(ingredient)
    });
}).catch(error => {
    console.error('Erreur', error)
})}
;

function updateIngredients(){
    machine.innerHTML = "";
    randomIngredients.forEach(ingredient => {
        const randomIngredientDiv = document.createElement('div');
        randomIngredientDiv.classList.add('random-ingredient');
        randomIngredientDiv.textContent =  ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
        machine.appendChild(randomIngredientDiv)
    });

    const newRandomButton = document.createElement('button');
    newRandomButton.textContent = "Nouveau cocktail !";
    machine.appendChild(newRandomButton);
    
    // PB ICI = LA PAGE PASSE DE LA HOMEPAGE A LA PAGE DU COCKTAIL ALEATOIRE EN MILLISECONDE
    newRandomButton.addEventListener('click', function(event){
        event.preventDefault();
        machine.innerHTML = startMachine;
        fetchRandomIngredients().then(updateIngredients);
        });
}

generateButton.addEventListener('click', function(event){
    event.preventDefault();
        fetchRandomIngredients().then(updateIngredients);
    });
