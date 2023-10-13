let addFavouriteButton = document.getElementById('add-favourites-btn');
let deleteFavouriteButton = document.getElementById('delete-favourite-btn');
const cocktailId = document.getElementById('cocktail-img-big').getAttribute('data-info');
let favouritesDb = [];

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

const manageDiv = document.getElementById("labels-container");
const firstChild = document.getElementById('cocktail-top-section');

const deleteMessage = document.createElement('div');
deleteMessage.textContent = 'Le cocktail a bien été retiré des favoris.';

deleteFavouriteButton.addEventListener('click', function(){
    const cocktailId = this.getAttribute('data-info');
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
    manageDiv.insertBefore(deleteMessage, deleteFavouriteButton);
    setTimeout(() => {
        deleteMessage.remove();
        location.reload();
        }, 1500);
    })
    .catch(error => {
        console.error('Erreur', error)
    })
});