const random = {
    machine : document.getElementById("generator"),
    generateRandomButton : document.querySelector(".generator-generate-btn"),
    startMachine : document.getElementById("generator").innerHTML,
    randomIngredients : [],
    virginCheckbox : document.getElementById("generator-virgin-option-checkbox"),
    
    // RECUPERER LES INGREDIENTS SANS ALCOOL ALEATOIRES
    fetchRandomVirginIngredients: ()=>{
        return fetch('/randomvirgin', {
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
            random.randomIngredients = data;
            console.log(random.randomIngredients)
        })
        .catch(error => {
            console.error('Erreur', error)
        })},

    // RECUPERER LES INGREDIENTS ALEATOIRES
    fetchRandomIngredients: ()=>{
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
            random.randomIngredients = data;
        })
        .catch(error => {
            console.error('Erreur', error)
        })},
    
    // AJOUTER DES INGREDIENTS ALEATOIRES AU DOM
    addRandomIngredients: ()=>{
        random.machine.innerHTML = "";
        random.randomIngredients.forEach(ingredient => {
        const randomIngredientDiv = document.createElement('div');
        randomIngredientDiv.classList.add('random-ingredient');
        randomIngredientDiv.textContent =  ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
        random.machine.appendChild(randomIngredientDiv)
    });
    },

    // AJOUTER LE BOUTON DE RETOUR A LA PAGE PRINCIPAL
    addNewRandomIngredientsBtn: ()=>{
        const newRandomButton = document.createElement('button');
        newRandomButton.textContent = "Nouveau cocktail !";
        random.machine.appendChild(newRandomButton);

        newRandomButton.addEventListener('click', function(event){
        event.preventDefault();
        random.machine.innerHTML = random.startMachine;
        random.addGenerateRandomButtonEventListener();
    });
    },

    // AJOUTER LE LISTENER SUR LE BOUTON DE GENERATION ALEATOIRE
    addGenerateRandomButtonEventListener: ()=>{
        let generateRandomButton = document.querySelector(".generator-generate-btn");
        let virginCheckbox = document.getElementById("generator-virgin-option-checkbox")
        generateRandomButton.addEventListener('click', async function (event){
            event.preventDefault();
            if(virginCheckbox.checked){
                await random.fetchRandomVirginIngredients();
            } else {
            await random.fetchRandomIngredients();
            }
            random.addRandomIngredients();
            random.addNewRandomIngredientsBtn();
        })
    }
}


// EVENEMENT DE DEPART SUR LE BOUTON DE GENERATION DE COCKTAIL ALEATOIRE
random.generateRandomButton.addEventListener('click', async function(event){
    event.preventDefault();
    if(random.virginCheckbox.checked){
        await random.fetchRandomVirginIngredients();
    } else {
    await random.fetchRandomIngredients();
    }
    random.addRandomIngredients();
    random.addNewRandomIngredientsBtn();
    random.addGenerateRandomButtonEventListener();
    });