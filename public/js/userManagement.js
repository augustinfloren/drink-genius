const manageDiv = document.getElementById('manage-users');
const firstChild = document.getElementById('first-child');

const deleteMessage = document.createElement('div');
deleteMessage.textContent = 'Le compte utilisateur a bien été supprimé.'

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
});