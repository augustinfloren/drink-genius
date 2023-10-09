const random = {
    machine : document.getElementById("bloc"),
    virginLabel : document.getElementById("generator-virgin-option-label"),
    virginCheckbox : document.getElementById("generator-virgin-option-checkbox"),
    filters : document.getElementById("generator-preferences-btn"),
    button : document.getElementById("boule"),
    newCocktail: document.getElementById("new-cocktail"),
    door: document.getElementById('door'),
    generatorTitle: document.getElementById('generator-title'),
    randomIngredients : [],

    generateListener: async (event) => {
        event.preventDefault();
        random.button.removeEventListener('click', random.generateListener);
        setTimeout (() => {
            random.button.addEventListener('click', random.generateListener);
        }, "6400")

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
        random.virginCheckbox.checked = false;
        random.newCocktail.style.display = "none";
        random.door.style.height = "60px";
        random.door.style.bottom = "";
        random.generatorTitle.innerText = "Générer un cocktail";
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
        random.virginLabel.style.display = "none";
        random.filters.style.display = "none";

        // Suppression de la liste d'ingrédients
        if (document.querySelector(".random-list")){
            document.querySelector(".random-list").remove();
        }

        const randomIngredientList = document.createElement('ul');
            randomIngredientList.classList.add('random-list');
            randomIngredientList.classList.add('generator-text-container');
            random.randomIngredients.forEach(ingredient => {
                const randomIngredient = document.createElement('li');
                randomIngredient.classList.add('random-ingredient');
                randomIngredient.textContent = '- ' + ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
                randomIngredientList.appendChild(randomIngredient)
            });
            setTimeout (() => {
            random.machine.appendChild(randomIngredientList);
            random.newCocktail.style.order = ("3");
            random.newCocktail.style.display = "block";
        }, "3400");
        random.newCocktail.style.display = "none";
    },
}

// EVENEMENT DE DEPART SUR LE BOUTON DE GENERATION DE COCKTAIL ALEATOIRE
random.button.addEventListener('click', random.generateListener);

// Ajout de l'event sur newCocktail
random.newCocktail.addEventListener("click", random.newCocktailListener);
