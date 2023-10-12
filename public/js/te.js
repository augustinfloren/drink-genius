// Cette fonction sera appelée lors de la saisie dans "searchbarAfterFilter"
function search_cocktail_after_filter() {
    console.log("search_cocktail:",search_cocktail_after_filter)
    // Récupérer la valeur de la barre de recherche
    let input = document.getElementById("searchbarAfterFilter").value.toLowerCase();
    // Sélectionner les éléments de cocktail qui ont survécu au filtrage par alcool
    let cocktails = window.cocktailsElt // Utiliser le tableau filtré par alcool
    console.log("cocktails:", cocktails)
    console.log("cocktailsElt:", cocktailsElt)
    // Boucler sur les éléments de cocktail pour afficher/masquer en fonction de la recherche par nom
    for (let i = 0; i < cocktails.length; i++) {
      let cocktailTitleElt = cocktails[i].getElementsByClassName("cocktail-title")[0] 
      if (!cocktailTitleElt.innerHTML.toLowerCase().includes(input)){      
      cocktails[i].style.display = "none"; // Masquer le cocktail
      } else {
        cocktails[i].style.display = "flex"; // Afficher le cocktail
      }
    }
  }