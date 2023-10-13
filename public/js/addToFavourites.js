// ECOUTE SUR LE BOUTON AJOUTER AUX FAVORIS
const messageContainer = document.getElementById("labels-container");
const successMessage = document.createElement("div");
successMessage.textContent = "Cocktail ajouté aux favoris!";


document.addEventListener("DOMContentLoaded", function () {
  const addFavouritesBtn = document.getElementById("add-favourites-btn");
  console.log("addFavouritesBtn:", addFavouritesBtn);
  
  if (addFavouritesBtn) {
    addFavouritesBtn.addEventListener("click", function () {
      const cocktailId = this.getAttribute("data-cocktail-id");
      
      fetch("/profile/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cocktailId: cocktailId })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("La requête a échoué");
          }
          return response.json();
        })
        .then(data => {
          messageContainer.insertBefore(successMessage, addFavouritesBtn);
          setTimeout(() => {
            successMessage.remove()
            location.reload();
          }, 1500);
             
        })
        .catch(error => {
          console.error("Erreur : ", error);
          
          
        });
    });
  } else {
    console.error("Le bouton n'a pas été trouvé.");
  }
});