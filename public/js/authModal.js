document.addEventListener("DOMContentLoaded", function () {

  // Modale
  const modalContainer = document.getElementById("auth-modal");
  const modal = document.querySelector(".modal");

  // Lien already registered
  const alreadyRegisteredLink = document.getElementById("already-registered-link");

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
  const closeBtn = document.getElementById("close-modal");
  const modalTriggerConnexion = document.querySelector(".modal-trigger-connexion");
  const fields = form.querySelectorAll("input");

  // Message d'erreurs pour les champs du form
  const dateSpan = document.querySelector("#date-field span");
  const passSpan = document.querySelector("#pass-field span");
  const confirmationSpan = document.querySelector("#confirmation-field span");
  let dateOK = false;
  let passOK = false;
  let confirmationOK = false;

  // Flag pour switcher entre login et signup
  let isRegistrationModal = false;

  // Listeners Fetch
  const loginListener = (event) => {
    event.preventDefault();
    fetchLogin();
  }

  const signupListener = (event) => {
    event.preventDefault();
    fetchSignup();
  }

  // Listeners infos champs formulaire
  // Messages d'erreurs date
  const ifWrongDateListener = (event) => {
    const inputValue = event.target.value;
    const currentYear = new Date().getFullYear();
    if (parseInt(inputValue) < 1900 || inputValue.length > 4) {
      dateSpan.style.display = "block";
      dateSpan.innerText = "Veuillez entrer une année de naissance valide.";
      dateOK = false;
    } else if (parseInt(inputValue) > currentYear - 18) {
      dateSpan.style.display = "block";
      dateSpan.innerText = "Vous devez avoir au moins 18 ans.";
      dateOK = false;
    } else {
      dateSpan.style.display="none";
      dateOK = true;
      if (dateOK && passOK && confirmationOK) {
        btn.removeAttribute("disabled");
      }
    }
  }

  // Récupération du regex
  const passRegex = new RegExp(passwordInput.getAttribute("pattern"));
  // Listener mot de passe
  const ifWrongPassListener = (event) => {
    const inputValue = event.target.value;
    if (!passRegex.test(inputValue)) {
      passSpan.style.display = "block";
      passSpan.innerText = "Doit contenir au moins 8 caractères, une majuscule, un chiffre, et un caractère spécial.";
      passOK = false;
    } else {
      passSpan.style.display ="none";
      passOK = true;
    }
    const confirmation = confirmationInput.value
    if (inputValue === confirmation) {
      confirmationOK = true;
      confirmationSpan.style.display ="none";
    } else {
      confirmationOK = false;
    }
    if (dateOK && passOK && confirmationOK) {
      btn.removeAttribute("disabled");
    }
  }

  // listener Confirmation
  const comparePassListener = (event) => {
    const password = passwordInput.value
    const inputValue = event.target.value;

    if (inputValue !== password ) {
      confirmationSpan.style.display = "block";
      confirmationSpan.innerText = "Les mots de passe doivent correspondrent.";
      confirmationOK = false;
    } else {
      confirmationSpan.style.display ="none";
      confirmationOK = true;
        if (dateOK && passOK && confirmationOK) {
          btn.removeAttribute("disabled");
        }
    }
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
    btn.removeAttribute("disabled");
    alreadyRegisteredLink.innerText = "Pas encore membre ? Par ici !";
    isRegistrationModal = false;
    dateSpan.style.display = "none";
    passSpan.style.display = "none";
    confirmationSpan.style.display = "none";

    // Suppresssion listener vérification champs
    dateInput.removeEventListener("keyup", ifWrongDateListener);
    passwordInput.removeEventListener("keyup", ifWrongPassListener);
    confirmationInput.removeEventListener("keyup", comparePassListener);

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
    btn.setAttribute("disabled", "true");
    alreadyRegisteredLink.innerText = "Déjà inscrit ? Par ici !";
    isRegistrationModal = true;

    // Vérification champs
    dateInput.addEventListener("keyup", ifWrongDateListener);
    passwordInput.addEventListener("keyup", ifWrongPassListener);
    confirmationInput.addEventListener("keyup", comparePassListener);

    // Supression du listener login
    form.removeEventListener("submit", loginListener);

    // Ajout du listener signup
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
    btn.removeAttribute("disabled");
    alreadyRegisteredLink.innerText = "Pas encore membre ? Par ici !";
    isRegistrationModal = false;
    dateSpan.style.display = "none";
    passSpan.style.display = "none";
    confirmationSpan.style.display = "none";

    // Suppresssion listener vérification champs
    dateInput.removeEventListener("keyup", ifWrongDateListener);
    passwordInput.removeEventListener("keyup", ifWrongPassListener);
    confirmationInput.removeEventListener("keyup", comparePassListener);

    // Suppression du listener signup
    form.removeEventListener("submit", signupListener);

    // Suppression du listener infos password
    passwordInput.removeEventListener("keyup", ifWrongPassListener);

    // Ajout du listener login
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

  // Signup + Récupération des messages de succès et d'erreurs
  async function fetchSignup() {
    fetch('/signin', {
      method: 'POST',
      body:  JSON.stringify(Object.fromEntries(new FormData(form))),
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(errorData => {
          if (errorData.error) {
            throw new Error(errorData.error); // Erreurs de Joi
          } else {
            throw new Error(errorData); // Erreurs du contrôleur
          }
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
      if (error.message.includes('déjà enregistré')) {
        modalTitle.innerText = "Cet e-mail est déjà enregistré.";
      } else if (error.message.includes('must be a valid email')){
        modalTitle.innerText = "E-mail invalide.";
      } else {
        modalTitle.innerText = "Une erreur s'est produite lors de l'inscription.";
      }
    })
  }

  // Login + Récupération des messages de succès et d'erreurs
  async function fetchLogin() {
    const formData = Object.fromEntries(new FormData(form));

    const loginForm = {
      "email": formData.email,
      "password": formData.password
    };

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
      closeBtn.style.display = "none";
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    })
    .catch(error => {
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





