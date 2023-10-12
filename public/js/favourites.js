const manageDiv = document.getElementById('favourites-content');
const firstChild = document.getElementById('favourite-container');

const deleteFavouriteButton = document.querySelectorAll('.delete-favourite');

const deleteMessage = document.createElement('div');
deleteMessage.textContent = 'Le cocktail a bien été retiré des favoris.';

deleteFavouriteButton.forEach(button =>{
    button.addEventListener('click', function(){
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
        manageDiv.insertBefore(deleteMessage, firstChild);
        setTimeout(() => {
            deleteMessage.remove();
            window.location.reload();
          }, 1500);
        })
        .catch(error => {
            console.error('Erreur', error)
        })
    })
})