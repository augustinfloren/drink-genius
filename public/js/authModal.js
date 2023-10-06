document.addEventListener("DOMContentLoaded", function () {

  // Modale
  const modalContainer = document.querySelector(".modal-container");

  // Lien already registered
  const alreadyRegisteredLink = document.getElementById("already-registered-link")

  const main = document.querySelector("main");
  const modalTitle = document.getElementById("modalTitle");
  const nomInput = document.getElementById("nom-input");
  const prenomInput = document.getElementById("prenom-input");
  const dateInput = document.getElementById("date-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const confirmationInput = document.getElementById("confirmation-input");
  const form = document.getElementById("auth-modal-form");
  const btn = document.getElementById("auth-modal-btn");

  //spans
  const dateSpan = document.querySelector("#date-field span");
  dateSpan.style.display = "none";
  dateSpan.style.fontSize = "0.7em";
  dateSpan.style.color = "red";

  let isRegistrationModal = false;

  const modalTriggerConnexion = document.querySelector(".modal-trigger-connexion");

  const loginListener = (event) => {
    event.preventDefault();
    fetchLogin();
  }

  const signupListener = (event) => {
    event.preventDefault();
    fetchSignup();
  }

  // Lorsque je clique sur Connexion
  modalTriggerConnexion.addEventListener("click", toggleModalConnexion);

  function toggleModalConnexion() {
    modalTitle.style.color = "var(--theme-purple)";
    modalTitle.style.fontSize = "1.5em";
    modalContainer.classList.toggle("active");
    modalTitle.innerText = "Connexion";
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

    form.removeEventListener("submit", signupListener);

    //Lorsque que je soumet le form
    form.addEventListener("submit", loginListener);
  }

  // Lorsque que je bascule sur inscription
  function toggleModalInscription() {
    modalTitle.style.color = "var(--theme-purple)";
    modalTitle.style.fontSize = "1.5em";
    modalTitle.innerText = "Remplissez ce formulaire puis remplissez votre verre !";
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

    dateInput.addEventListener("keyup", (event) => {
      const inputValue = event.target.value;
      const currentYear = new Date().getFullYear();
      console.log(inputValue)
      if (parseInt(inputValue) > currentYear - 18) {
          dateSpan.style.display = "block";
          dateSpan.innerText = "Vous devez avoir au moins 18 ans";
        setTimeout(() => {
          dateSpan.style.display="none";
        }, 2000);
      }
    });

    //Lorsque que je soumet le form
    form.addEventListener("submit", signupListener);
  }

  // Lorsque je bascule d'inscription à connexion
  modalTriggerConnexion.addEventListener("click", toggleModalConnexion);

  function switchModalConnexion() {
    modalTitle.style.color = "var(--theme-purple)";
    modalTitle.style.fontSize = "1.5em";
    modalTitle.innerText = "Connexion";
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
    dateSpan.style.display = "none";

    form.removeEventListener("submit", signupListener);

    //Lorsque que je soumet le form
    form.addEventListener("submit", loginListener);
  }

  // Clic pour basculer
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

  // Fermeture de la modale
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModalClosure)
  );

  function toggleModalClosure() {
    modalContainer.classList.toggle("active");
  }

  // Signup : Récupération des messages de succès et d'erreurs
  async function fetchSignup() {
    fetch('/signin', {
      method: 'POST',
      body:  JSON.stringify(Object.fromEntries(new FormData(form))),
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(errorData => {
        throw new Error(errorData);
      });
      }
      return response.json();
    })
    .then(data => {
      switchModalConnexion();
      modalTitle.innerText = data;
      modalTitle.style.fontSize = "1.3em";
    })
    .catch(error => {
      modalTitle.style.color = "red";
      modalTitle.style.fontSize = "1.3em";
      if (error.message.includes('email')) {
        modalTitle.innerText = "Cet e-mail est déjà enregistré.";
      } else {
        modalTitle.innerText = "Une erreur s'est produite lors de l'inscription.";
      }
    })
  }

  // Login : Récupération des messages de succès et d'erreurs
  async function fetchLogin() {
    const formData = Object.fromEntries(new FormData(form));

    const loginForm = {
      "email": formData.email,
      "password": formData.password
    };

    console.log(loginForm)
    fetch('/login', {
      method: 'POST',
      body:  JSON.stringify(loginForm),
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(errorData => {
        throw new Error(errorData);
      });
      }
      return response.json();
    })
    .then(data => {
      form.style.display = "none";
      alreadyRegisteredLink.style.display = "none";
      modalTitle.style.color = "var(--theme-purple)";
      modalTitle.innerText = data;
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    })
    .catch(error => {
      console.log(error)
      modalTitle.style.color = "red";
      modalTitle.style.fontSize = "1.3em";
      if (error.message.includes('Utilisateur')) {
        modalTitle.innerText = "Utilisateur non trouvé.";
      } else if (error.message.includes('Mot de passe')) {
        modalTitle.innerText = "Mot de passe incorrect.";
      } else {
        modalTitle.innerText = "Une erreur s'est produite de l'authentification.";
      }
    })
  }
});




