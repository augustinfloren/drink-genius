const random = {
    machine : document.getElementById("bloc"),
    virginLabel : document.getElementById("generator-virgin-option-label"),
    virginCheckbox : document.getElementById("generator-virgin-option-checkbox"),
    filters : document.getElementById("generator-preferences-btn"),
    // buttonContainer: document.querySelector(".generator-generate-btn"),
    button : document.getElementById("boule"),
    randomIngredients : [],

    generateListener: async (event) => {
        event.preventDefault();
        if(random.virginCheckbox.checked){
            await random.fetchRandomVirginIngredients();
        } else {
        await random.fetchRandomIngredients();
        }
        random.addRandomIngredients();
    },

    newCocktailListener: async (event) => {
        event.preventDefault();
        random.virginLabel.style.display = ("block");
        random.filters.style.display = ("block");
        const list = document.querySelector(".random-list");
        list.remove();
        random.button.textContent = ("Générer");
        random.button.removeEventListener('click', random.newCocktailListener);
        random.button.addEventListener('click', random.generateListener);
        random.virginCheckbox.checked = false;
    },

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
        // random.machine.innerHTML = "";
        random.virginLabel.style.display = "none";
        random.filters.style.display = "none";

        const randomIngredientList = document.createElement('ul');
        randomIngredientList.classList.add('random-list');
        randomIngredientList.style.display = ("flex");
        randomIngredientList.style.flexDirection = ("column");
        randomIngredientList.style.gap = ("10px");
        randomIngredientList.style.fontSize = ("1.5em");
        random.randomIngredients.forEach(ingredient => {
            const randomIngredient = document.createElement('li');
            randomIngredient.classList.add('random-ingredient');
            randomIngredient.textContent = '- ' + ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
            randomIngredientList.appendChild(randomIngredient)
        });
        random.machine.appendChild(randomIngredientList);
        // random.buttonContainer.style.order = ("4");
        random.button.removeEventListener('click', random.generateListener);
        random.button.addEventListener('click', random.newCocktailListener);
        random.button.innerText = "Faire un nouveau cocktail";
    },
}

// EVENEMENT DE DEPART SUR LE BOUTON DE GENERATION DE COCKTAIL ALEATOIRE
random.button.addEventListener('click', random.generateListener);
