console.log("Hello")
let machine = document.getElementById("generator");
let generateButton = document.getElementById("generator-generate-btn");
let generatedIngredients = document.getElementById("generated-ingredients");

generateButton.addEventListener('click', async function(){
    machine.textContent = "";
    machine.appendChild(generatedIngredients);
})