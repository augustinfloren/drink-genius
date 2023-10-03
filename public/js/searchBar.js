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


