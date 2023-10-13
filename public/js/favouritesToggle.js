// AFFICHAGE DU BOUTON AJOUTER/SUPPRIMER
let addFavouriteButton = document.getElementById('add-favourites-btn');
let deleteFavouriteButton = document.getElementById('delete-favourite-btn');
const cocktailId = document.querySelector('cocktail-img').getAttribute('data-info');
const message = document.getElementById('confirmation-message');
let favouritesDb = [];

// RECUPERATION DES ID DES COCKTAILS FAVORIS PAR UTILISATEUR CONNECTE
function getFavouritesId(){
    return fetch("/profile/usersfavourites", {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        },
    })
        .then(response => {
        if (!response.ok) {
            throw new Error("La requête a échoué");
        }
        return response.json();
        })
        .then(data => {
            favouritesDb = data;
        })
        .catch(error => {
        console.error("Erreur : ", error);
        });
}

// AFFICHAGE BOUTON AJOUTER/SUPPRIMER
async function favouritesToggle() {
await getFavouritesId();
const presence = favouritesDb.some(el => el.id === parseInt(cocktailId));
if(presence){
    deleteFavouriteButton.style.display = "block";
    } else {
        addFavouriteButton.style.display = "block";
    }
};

favouritesToggle();

// ECOUTE SUR LE BOUTON AJOUTER AUX FAVORIS
document.addEventListener("DOMContentLoaded", function () {
  const addFavouritesBtn = document.getElementById("add-favourites-btn");
  
  if (addFavouritesBtn) {
    addFavouritesBtn.addEventListener("click", function () {
      const cocktailId = this.getAttribute("data-cocktail-id");
      
      // ECRITURE EN BDD DU NOUVEAU COCKTAIL FAVORI
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
          message.textContent = "Cocktail ajouté aux favoris!";
          message.style.display = "block";
          setTimeout(() => {
            message.style.display = "none";
            deleteFavouriteButton.style.display = "block";
            addFavouriteButton.style.display = "none";
          }, 1500);
             
        })
        .catch(error => {
          console.error("Erreur : ", error);
          
          
        });
    });
  }
});

// ECOUTE SUR LE BOUTON DE SUPPRESSION DES FAVORIS
deleteFavouriteButton.addEventListener('click', function(){
    const cocktailId = this.getAttribute('data-info');

    // SUPPRESSION DU COCKTAIL EN BDD
    fetch('/profile/favourites', {
        method: 'DELETE',
        body: JSON.stringify({ cocktailId: cocktailId }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok){
            throw new Error('la requete a échoué')
        }
        return response.json();
    })
    .then(data => {
        message.textContent = 'Le cocktail a bien été retiré des favoris.';
        message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
        deleteFavouriteButton.style.display = "none";
        addFavouriteButton.style.display = "block";
        }, 1500);
    })
    .catch(error => {
        console.error('Erreur', error)
    })
});
