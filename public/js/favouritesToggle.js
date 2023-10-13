// AFFICHAGE DU BOUTON AJOUTER/SUPPRIMER
let favouriteButton = document.querySelector('.add-favourite-btn');
const cocktailId = document.querySelector('.cocktail-img').getAttribute('data-info');
let favouritesDb = [];

// RECUPERATION DES ID DES COCKTAILS FAVORIS PAR UTILISATEUR CONNECTE
async function getFavouritesId(){
  return await fetch("/profile/usersfavourites", {
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

// AFFICHAGE BOUTON AJOUTER
async function favouritesToggle() {
  await getFavouritesId();
  const presence = favouritesDb.some(el => el.id === parseInt(cocktailId));
  if(presence){
    favouriteButton.classList.add('fa-solid');
    favouriteButton.removeEventListener('click', addFavourite);
    favouriteButton.addEventListener('click', deleteFavourite);
  } else {
    // ECOUTE SUR LE BOUTON AJOUTER AUX FAVORIS
    favouriteButton.addEventListener("click", addFavourite);
  };

  function addFavourite() {
    const cocktailId = this.getAttribute("data-cocktail-id");
    // ECRITURE EN BDD DU NOUVEAU COCKTAIL FAVORIS
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
        favouriteButton.classList.remove('fa-regular');
        favouriteButton.classList.add('fa-solid');
        favouriteButton.removeEventListener('click', addFavourite);
        favouriteButton.addEventListener('click', deleteFavourite);
      })
      .catch(error => {
        console.error("Erreur : ", error);
      });
    }

  // ECOUTE SUR LE BOUTON DE SUPPRESSION DES FAVORIS

  function deleteFavourite() {
    const cocktailId = this.getAttribute('data-cocktail-id');
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
        console.log("Delete ok")
        favouriteButton.classList.remove('fa-solid');
        favouriteButton.classList.add('fa-regular');
        favouriteButton.removeEventListener('click', deleteFavourite);
        favouriteButton.addEventListener('click', addFavourite);
    })
    .catch(error => {
        console.error('Erreur', error)
    })
  }
}

favouritesToggle();