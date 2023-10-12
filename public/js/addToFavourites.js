// ECOUTE SUR LE BOUTON AJOUTER AUX FAVORIS

document.addEventListener("DOMContentLoaded", function () {
  const addFavouritesBtn = document.getElementById("add-favourites-btn");
  console.log("addFavouritesBtn:", addFavouritesBtn);
  
  if (addFavouritesBtn) {
    addFavouritesBtn.addEventListener("click", function () {
      const cocktailId = this.getAttribute("data-cocktail-id");
      console.log("cocktailId:", cocktailId);
      fetch("/profile/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cocktailId: cocktailId })
      })
        .then(response => {
          console.log("response :", response);
          if (!response.ok) {
            throw new Error("La requête a échoué");
          }
          return response.json();
        })
        .then(data => {
          console.log("data", data);    
        })
        .catch(error => {
          console.error("Erreur : ", error);
        });
    });
  } else {
    console.error("Le bouton n'a pas été trouvé.");
  }
});
