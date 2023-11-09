const manageDiv = document.getElementById('manage-cocktails');
const firstChild = document.getElementById('first-child');

const validateButton = document.querySelectorAll('.validate-cocktail');
const validationMessage = document.createElement('div');
validationMessage.textContent = 'Le cocktail a bien été validé.';

const deleteMessage = document.createElement('div');
deleteMessage.textContent = 'Le cocktail a bien été supprimé.'

const errorMessage = document.createElement('div');
errorMessage.textContent = 'Une erreur est survenue. Merci de ressayer ultérieurement.';

validateButton.forEach(button => {
button.addEventListener('click', function(){
    const cocktailId = this.getAttribute('data-info');
    fetch('/admin/cocktail', {
        method: 'POST',
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
    manageDiv.insertBefore(validationMessage, firstChild);
    setTimeout(() => {
        validationMessage.remove();
        window.location.reload();
      }, 1500);
    })
    .catch(error => {
        console.error('Erreur', error);
        manageDiv.insertBefore(errorMessage, firstChild);
        setTimeout(() => {
            errorMessage.remove();
            window.location.reload();
          }, 1500);
    })
})
});

const deleteButton = document.querySelectorAll('.delete-cocktail');
deleteButton.forEach(button => {
button.addEventListener('click', function (){
    const cocktailId = this.getAttribute('data-info');
    fetch('/admin/cocktail', {
        method: 'DELETE',
        body: JSON.stringify({ cocktailId: cocktailId }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
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
        console.error('Erreur', error);
        manageDiv.insertBefore(errorMessage, firstChild);
        setTimeout(() => {
            errorMessage.remove();
            window.location.reload();
          }, 1500);
    })
})
});
