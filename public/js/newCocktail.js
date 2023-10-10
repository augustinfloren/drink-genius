let mainContainer = document.getElementById("profile-flex-content");
let startParameters = document.getElementById("profile-flex-content").innerHTML;


/**************** PARAMETRES  ****************/
// ECOUTE SUR LE BOUTON PARAMETRE ET AFFICHE LES DONNEES
let accountParametersButton = document.getElementById("parameters-link");
accountParametersButton.addEventListener('click', function(){
    mainContainer.innerHTML = startParameters;
})


/***************** NOUVEAU COCKTAIL *****************/
// AFFICHER LA PAGE POUR PROPOSER UN NOUVEAU COCKTAIL
let newCocktailButton = document.getElementById('newcocktail-link');
let ingredients = [];

// RECUPERER LES INGREDIENTS
function fetchIngredients (){
    return fetch('/ingredients', {
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
        ingredients = data;
    })
    .catch(error => {
        console.error('Erreur', error)
    })};


function createForm(){
    // TITRE
    const title = document.createElement('h2');
    title.textContent = 'Votre cocktail :'
    mainContainer.appendChild(title);

    // FORMULAIRE
    const cocktailForm = document.createElement('form');
    cocktailForm.method = 'POST';
    cocktailForm.action = '/newcocktail';
    cocktailForm.id = "new-cocktail-form";
    mainContainer.style.justifyContent = "left";

    // TITRE DE LA RECETTE
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name-input');
    const nameLabelText = document.createTextNode('Nom de la recette :');
    nameLabel.appendChild(nameLabelText);
    const nameInput = document.createElement('input');
    nameInput.classList.add('input');
    nameInput.id = 'name-input';
    nameInput.type = 'text';
    nameInput.name = 'name';

    // INSTRUCTIONS
    const instructionLabel = document.createElement('label');
    instructionLabel.setAttribute('for', 'instruction-input');
    const instructionLabelText = document.createTextNode('Recette :');
    instructionLabel.appendChild(instructionLabelText);
    const instructionInput = document.createElement('textarea');
    instructionInput.classList.add('input');
    instructionInput.id = 'instruction-input';
    instructionInput.name = 'instruction';

    // INGREDIENTS
    let ingredientCounter = 1;
    function createIngredientDropdown(){
        const ingredientLabel = document.createElement('label');
        ingredientLabel.setAttribute('for', 'ingredient-input');
        const ingredientLabelText = document.createTextNode(`Ingrédient ${ingredientCounter} :`);
        ingredientLabel.appendChild(ingredientLabelText);
        const ingredientInput = document.createElement('select');
        ingredientInput.classList.add('dropdown-menu');
        ingredientInput.id = `ingredient-${ingredientCounter}`;
        ingredientInput.name = `ingredientId`;


        ingredients.forEach(ingredient => {
            const newOption = document.createElement('option');
            newOption.value = ingredient.id;
            newOption.text = `${ingredient.name} (${ingredient.unit})`;

            newOption.setAttribute('data-ingredient-id', ingredient.id);
            ingredientInput.appendChild(newOption);
        })

        cocktailForm.appendChild(ingredientLabel)
        cocktailForm.appendChild(ingredientInput);
    };

    // A FAIRE : CREER UNE CONDITION POUR NE PAS DEPASSER LA LIMITE DONNEE DANS ingredient.max_quantity
    function createQuantityInput(){
        const quantityLabel = document.createElement('label');
        quantityLabel.setAttribute('for', 'quantity-input');
        const quantityLabelText = document.createTextNode(`Quantité pour l'ingrédient ${ingredientCounter}`);
        quantityLabel.appendChild(quantityLabelText);
        const quantityInput = document.createElement('input');
        quantityInput.classList.add('quantity-input');
        quantityInput.id = `quantity-${ingredientCounter}`;
        quantityInput.name = `quantity`;

        cocktailForm.appendChild(quantityLabel);
        cocktailForm.appendChild(quantityInput);
    }

    createIngredientDropdown();
    createQuantityInput();

    // CREATION D'UN BOUTON "AJOUTER UN INGREDIENT"
    const addIngredientButton = document.createElement('div');
    addIngredientButton.textContent = "+ Ajouter un ingrédient";
    addIngredientButton.classList.add('add-ingredient-button');
    addIngredientButton.addEventListener('click', function(){
        ingredientCounter++;
        createIngredientDropdown();
        createQuantityInput();
    })

    // CREATION DU BOUTON POUR SOUMETTRE LE COCKTAIL
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add("button");
    submitButton.textContent = 'Envoyer'

    // AJOUT DES ELEMENTS AU FORMULAIRE
    cocktailForm.appendChild(nameLabel);
    cocktailForm.appendChild(nameInput);
    cocktailForm.appendChild(instructionLabel);
    cocktailForm.appendChild(instructionInput);
    cocktailForm.appendChild(addIngredientButton);
    cocktailForm.appendChild(submitButton);

    // AJOUT DES ELEMENTS AU DOM
    mainContainer.textContent = '';
    mainContainer.appendChild(cocktailForm);
};

newCocktailButton.addEventListener('click', async function(){
    await fetchIngredients();
    createForm();
});

