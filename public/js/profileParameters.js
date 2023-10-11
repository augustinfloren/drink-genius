/**************** PARAMETRES  ****************/

// ECOUTE SUR LE BOUTON MODIFIER ET AFFICHE LE FORMULAIRE DE MODIFICATION
const parametersModificationBtn = document.getElementById("parameters-modification-btn");
const parametersForm = document.getElementById("parameters-form");
const parametersList = document.getElementById("parameters-list");

parametersModificationBtn.addEventListener("click", function () {
// MASQUER LES INFORMATIONS ACTUELLES ET AFFICHER LE FORMULAIRE DE MODIFICATION
  parametersForm.style.display = "block";
  parametersList.style.display = "none";
});

function updateUserInfo (userInfo){
  return fetch("/profile", {
    method: "PATCH",
    body: JSON.stringify(Object.fromEntries(new FormData(userInfo))),
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      if (!response.ok){
        throw new Error("la requete a échoué");
      }
      return response.json();
    })
    .then(data => {
        console.log('Données mises à jour : ', data);
        window.location.reload();
    })
    .catch(error => {
      console.error("Erreur", error);
    });}

// ECOUTE SUR LE BOUTON ENREGISTRER ET ENVOYER LES DONNEES DU FORMULAIRE
const registerBtn = document.getElementById("parameters-save-changes-btn");
// SOUMETTRE LE FORMULAIRE AVEC LES DONNEES MODIFIEES
registerBtn.addEventListener("click", async function (event) {
    event.preventDefault();
  const updateForm = document.getElementById("parameters-form");
  await updateUserInfo(updateForm);
});

/**************** SUPPRIMER SON COMPTE ****************/
const deleteButton = document.getElementById('delete-account-button');
const confirmation = document.getElementById('deletion-confirmation');
deleteButton.addEventListener('click', function(){
  confirmation.style.display = "block";
  const validation = document.getElementById('validation');
  validation.addEventListener('click', function (){
    fetch('/profile', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
      if (!response.ok){
          throw new Error('la requete a échoué')
      }
      return response.json();
  })
  .then(data => {
      window.location.href = '/'
      console.log(data);
  })
    .catch(error => {
        console.error('Erreur', error)
    })
  });

  const refusal = document.getElementById('refusal');
  refusal.addEventListener('click', function(){
    confirmation.style.display = "none";
  })
  });