document.addEventListener("DOMContentLoaded", function () {

  // Modale
  const modalContainer = document.querySelector(".modal-container");

  // Lien already registered
  const alreadyRegisteredLink = document.getElementById("already-registered-link")

  // Par défaut, tous les champs du formulaire apparaissent mais pour la modale Connexion
  // Je n'ai besoin que du champs "email" et "mot de passe" donc :
  const nomInput = document.getElementById("nom-input");
  const prenomInput = document.getElementById("prenom-input");
  const dateInput = document.getElementById("date-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const confirmationInput = document.getElementById("confirmation-input");
  const form = document.getElementById("auth-modal-form");
  const btn = document.getElementById("auth-modal-btn");

  let isRegistrationModal = false;

  const modalTriggerConnexion = document.querySelector(".modal-trigger-connexion");

  // Lorsque je clique sur Connexion
  modalTriggerConnexion.addEventListener("click", toggleModalConnexion);

  function toggleModalConnexion() {
    modalContainer.classList.toggle("active");
    nomInput.style.display = "none";
    prenomInput.style.display = "none";
    dateInput.style.display = "none";
    confirmationInput.style.display = "none";
    form.style.marginTop = "-20px";
    form.action = "/login";
    btn.style.marginTop = "0px";
    btn.innerText = "Se connecter";
    alreadyRegisteredLink.innerText = "Pas encore membre ? Par ici !";
    isRegistrationModal = false;
  }

  // Lorsque que je bascule sur inscription
  function toggleModalInscription() {
    nomInput.style.display = "block";
    nomInput.value = "";
    nomInput.setAttribute("required", true);
    prenomInput.style.display = "block";
    prenomInput.setAttribute("required", true);
    prenomInput.value = "";
    dateInput.style.display = "block";
    dateInput.setAttribute("required", true);
    dateInput.value = "";
    confirmationInput.style.display = "block";
    confirmationInput.setAttribute("required", true);
    confirmationInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    form.style.marginTop = "0px";
    form.action = "/signIn";
    btn.style.marginTop = "10px";
    btn.innerText = "S'enregistrer";
    alreadyRegisteredLink.innerText = "Déjà inscrit ? Par ici !";
    isRegistrationModal = true;
  }

  // Lorsque je bascule d'inscription à connexion
  modalTriggerConnexion.addEventListener("click", toggleModalConnexion);

  function switchModalConnexion() {
    nomInput.style.display = "none";
    nomInput.removeAttribute("required");
    nomInput.value = "";
    prenomInput.style.display = "none";
    prenomInput.removeAttribute("required");
    prenomInput.value = "";
    dateInput.style.display = "none";
    dateInput.removeAttribute("required");
    dateInput.value = "";
    confirmationInput.style.display = "none";
    confirmationInput.removeAttribute("required");
    confirmationInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    form.style.marginTop = "-20px";
    form.action = "/login";
    btn.innerText = "Se connecter";
    alreadyRegisteredLink.innerText = "Pas encore membre ? Par ici !";
    isRegistrationModal = false;
  }

  // basculer entre connexion et inscription
  alreadyRegisteredLink.addEventListener("click", function (event) {
    event.preventDefault();
    if (isRegistrationModal) {
      // Si l'inscription est affichée, basculez vers la connexion
      switchModalConnexion();
    } else {
      // Sinon, basculez vers l'inscription
      toggleModalInscription();
    }
  });

  // Fermeture des modales (CONNEXION ET INSCRIPTION)
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModalClosure)
  );

  function toggleModalClosure() {
    modalContainer.classList.toggle("active");
  }

});
