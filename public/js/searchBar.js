    // Utiliser la searchbar en faisant une sélection par nom de cocktails
function search_cocktail() {
   
    // Récupérer la valeur de la barre de recherche par l'id de la searchbar
  let input = document.getElementById("searchbar").value.toLowerCase();


    // Sélectionnner la classe "cocktail qui englobe le titre et l'img"
  let cocktails = document.getElementsByClassName("cocktail");

    // Boucle for avec variable "i" comme indice, elle commence à 0 jusqu'à la fin de la liste des cocktails
  for (let i = 0; i < cocktails.length; i++) {
  
    // Obtenir un élément de la liste
let cocktailTitleElt = cocktails[i].getElementsByClassName("cocktail-title")

  //S'il n'y a pas de charactère en commun entre ce qu'on tape et les noms des cocktails
  //Il n'affiche rien. Sinon cela affiche le ou les cocktails concernés
    if (!cocktailTitleElt[0].innerHTML.toLowerCase().includes(input)) {
      cocktails[i].style.display = "none";
    } else {
      cocktails[i].style.display = "flex";
    }
  }
}

  //Utiliser la searchbar lorsqu'il y a déja eu un 1er filtre par alcool
function filterCocktailsByName(name) {
  let cocktails = document.getElementsByClassName("cocktail");

  for (let i = 0; i < cocktails.length; i++) {
    let cocktailTitleElt = cocktails[i].getElementsByClassName("cocktail-title");

    if (!cocktailTitleElt[0].innerHTML.toLowerCase().includes(name)) {
      cocktails[i].style.display = "none";
    } else {
      cocktails[i].style.display = "flex";
    }
  }
}
  // Désélectionner toutes les cases à cocher
function resetSpiritFilters() {
  const checkboxes = document.getElementsByName("spirit");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  // Réafficher tous les cocktails
  const cocktails = document.getElementsByClassName("cocktail");
  for (let i = 0; i < cocktails.length; i++) {
    cocktails[i].style.display = "flex";
  }
}

