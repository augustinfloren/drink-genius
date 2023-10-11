const validateButton = document.getElementById('validate-cocktail');
validateButton.addEventListener('click', function(){
    const cocktailId = this.getAttribute('data-info');
    console.log("l'ID dans le script", cocktailId)
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
      window.location.reload();
      console.log(data);
  })
    .catch(error => {
        console.error('Erreur', error)
    })
});