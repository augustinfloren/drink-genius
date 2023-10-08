// Chercher la modale
const inscriptionModal = document.getElementById("auth-modal-form");

inscriptionModal.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collectez les données du formulaire
    const email = document.getElementById("email-input").value;
    const firstname = document.getElementById("prenom-input").value;


    // Envoyez les données au serveur
    fetch('/confirmationsent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstname })
    })
    .then(response => response.json())
    .then(data => {
        info = data
        console.log("je:",data);
        console.log("je je:",info)
        // Vous pouvez effectuer des actions supplémentaires ici, par exemple, afficher un message de confirmation à l'utilisateur.
    })
    .catch(error => {
        console.error('Erreur lors de la requête fetch', error);
    });
});
