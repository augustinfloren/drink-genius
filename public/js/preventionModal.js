document.addEventListener("DOMContentLoaded", function () {

    // SessionStorage pour vérifier que la modale Prevention n'apparaisse qu'une seule fois
    if (!sessionStorage.getItem("modalShown")){
        const modalContainerPrevention = document.getElementById("prevention-modal");
        const messageContainer = document.getElementById("message-prevention");
        const birthYearInput = document.getElementById("birthYear");
        const ageForm = document.getElementById("ageForm");
        const checkAgeButton = document.getElementById("checkAgeButton");
        modalContainerPrevention.classList.toggle("active");
        const errorMessage = document.getElementById("birthYear-error");
        const errorInput = document.getElementById("birthYear");

        // Pour savoir si on a la majorité (en France) peu importe l'année qu'on soit
        const currentYear = new Date().getFullYear();
        birthYearInput.max = currentYear.toString();

        checkAgeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const birthYear = parseInt(birthYearInput.value);
            // L'utilisateur n'a pas entré d'année de naissance
            if (isNaN(birthYear)) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Merci d'entrer une date de naissance."
                return;
            }
            // Si l'utilisateur n'a pas 18ans
            if (parseInt(birthYear) > currentYear - 18) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Vous devez avoir au moins 18 ans. (redirection vers google).";
                // Redirection vers Google après 3 secondes
                setTimeout(function() {
                    window.location.href = "https://www.google.fr";
                }, 3000);
            } else if (birthYear < 1900) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Veuillez entrer une année de naissance valide.";
            // Si + de 18ans, la personne peut profiter du site
            } else {
                sessionStorage.setItem("modalShown", "true");
                modalContainerPrevention.classList.toggle("active");
            }
        });

    }
});

