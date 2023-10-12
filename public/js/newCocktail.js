
/*********** AJOUTER UN NOUVEL INGREDIENT ET SA QUANTITE ***********/
let ingredientCounter = 1;
let ingredients = [];
const newIngredientButton = document.querySelector('.add-ingredient-button')

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


async function createNewDropDown(){
    // INGREDIENTS
    const ingredientSection = document.getElementById('ingredients-section');
    await fetchIngredients();

    const ingredientLabel = document.createElement('label');
    ingredientLabel.setAttribute('for', 'ingredient-input');
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = "  - retirer";
    deleteBtn.style.color = "red";
    deleteBtn.style.cursor = "pointer";
    const ingredientLabelText = document.createTextNode(`Ingrédient ${ingredientCounter} `);
    ingredientLabel.appendChild(ingredientLabelText);
    ingredientLabel.appendChild(deleteBtn);
    const ingredientInput = document.createElement('select');
    ingredientInput.classList.add('new-cocktail-dropdown');
    ingredientInput.id = `ingredient-${ingredientCounter}`;
    ingredientInput.name = `ingredientId`;

    ingredients.forEach(ingredient => {
        const newOption = document.createElement('option');
        newOption.value = ingredient.id;
        newOption.text = `${ingredient.name} (${ingredient.unit})`;

        ingredientInput.appendChild(newOption);
    })

    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', 'quantity-input');
    const quantityLabelText = document.createTextNode(`Quantité pour l'ingrédient ${ingredientCounter}`);
    quantityLabel.appendChild(quantityLabelText);
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.classList.add('quantity-input');
    quantityInput.id = `quantity-${ingredientCounter}`;
    quantityInput.name = `quantity`;

    deleteBtn.addEventListener("click", () => {
        ingredientLabel.remove();
        ingredientInput.remove();
        quantityLabel.remove();
        quantityInput.remove();
    });

    ingredientSection.appendChild(ingredientLabel)
    ingredientSection.appendChild(ingredientInput);
    ingredientSection.appendChild(quantityLabel);
    ingredientSection.appendChild(quantityInput);
};

newIngredientButton.addEventListener('click', async function(){
    ingredientCounter++;
    await createNewDropDown();
})

