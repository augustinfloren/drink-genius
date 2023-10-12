const deleteButton = document.querySelectorAll('.delete-user');
deleteButton.forEach(button => {
button.addEventListener('click', function (){
    const userId = this.getAttribute('user-info');
    fetch('/admin/user', {
        method: 'DELETE',
        body: JSON.stringify({ userId: userId }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('la requete a échoué')
        }
        console.log('fetch');
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