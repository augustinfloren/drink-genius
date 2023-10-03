let machine = document.getElementById("generator");
let generateButton = document.getElementById("generator-generate-btn");
let randomIngredients = [];

fetch('/random', {
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
    data.forEach(ingredient => {
        randomIngredients.push(ingredient)
    });
}).catch(error => {
    console.error('Erreur', error)
});


generateButton.addEventListener('click', async function(event){
    event.preventDefault();
    machine.textContent = "";
    randomIngredients.forEach(ingredient => {
        const randomIngredientDiv = document.createElement('div');
        randomIngredientDiv.classList.add('random-ingredient');
        randomIngredientDiv.textContent =  ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
        machine.appendChild(randomIngredientDiv)

        
    })
})