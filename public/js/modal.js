// Chercher la modale
const modalContainer = document.querySelector(".modal-container");

// POUR INSCRIPTION
// Chercher l'élément qui va déclencher la modale pour Inscription
const modalTriggerInscription = document.querySelector(".modal-trigger-inscription");

// Par défaut, tous les champs du formulaire apparaissent mais pour la modale Connexion
// Je n'ai besoin que du champs "email" et "mot de passe" donc :
const nomInput = document.getElementById("nom-input");
const prenomInput = document.getElementById("prenom-input");
const dateInput = document.getElementById("date-input");
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const date = document.querySelector(".date");
const confirmationLabel = document.querySelector(".confirmation");
const confirmationInput = document.getElementById("confirmation-input");
const form = document.getElementById("auth-modal-form");
const btn = document.getElementById("auth-modal-btn");

// Lorsque je clique sur Inscription
modalTriggerInscription.addEventListener("click", toggleModalInscription);

function toggleModalInscription() {
  modalContainer.classList.toggle("active");
  nomInput.style.display = "block";
  prenomInput.style.display = "block";
  dateInput.style.display = "block";
  firstName.style.display = "block";
  lastName.style.display = "block";
  confirmationInput.style.display = "block";
  confirmationLabel.style.display = "block";
  date.style.display = "block";
  form.style.marginTop = "0px";
  btn.innerText = "S'enregistrer";
}

// POUR CONNEXION
// Chercher l'élément qui va déclencher la modale pour Connexion
const modalTriggerConnexion = document.querySelector(".modal-trigger-connexion");

// Lorsque je clique sur Connexion
modalTriggerConnexion.addEventListener("click", toggleModalConnexion);

function toggleModalConnexion() {
  modalContainer.classList.toggle("active");
  nomInput.style.display = "none";
  prenomInput.style.display = "none";
  dateInput.style.display = "none";
  firstName.style.display = "none";
  lastName.style.display = "none";
  date.style.display = "none";
  confirmationInput.style.display = "none";
  confirmationLabel.style.display = "none";
  form.style.marginTop = "-40px";
  btn.innerText = "Se connecter";
}

// Fermeture des modales (CONNEXION ET INSCRIPTION)
const modalTriggers = document.querySelectorAll(".modal-trigger");
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModalClosure)
);

function toggleModalClosure() {
  modalContainer.classList.toggle("active");
}
