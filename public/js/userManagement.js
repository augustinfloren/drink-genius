const manageDiv = document.getElementById('manage-users');
const firstChild = document.getElementById('first-child');

const deleteMessage = document.createElement('div');
deleteMessage.textContent = 'Le compte utilisateur a bien été supprimé.'

const errorMessage = document.createElement('div');
errorMessage.textContent = 'Une erreur est survenue. Merci de réessayer plus tard.'

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

const adminBtn = document.querySelectorAll('.admin-user');
const adminMessage = document.createElement('div');
adminMessage.textContent = "Le role a bien été mis à jour";
adminBtn.forEach(button =>{
    button.addEventListener('click', function(){
        const userId = this.getAttribute('user-info');
        fetch('/admin/role', {
            method: 'PATCH',
        body: JSON.stringify({ userId: userId }),
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
        manageDiv.insertBefore(adminMessage, firstChild);
        setTimeout(() => {
            adminMessage.remove();
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
})