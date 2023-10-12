const validateButton = document.querySelectorAll('.validate-cocktail');
validateButton.forEach(button => {
button.addEventListener('click', function(){
    const cocktailId = this.getAttribute('data-info');
    const messageDiv = document.createElement('div');
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
      console.log(data);
      window.location.reload();
    })
    .catch(error => {
        console.error('Erreur', error)
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
        window.location.reload();
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur', error)
    })
})
});