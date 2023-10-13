
// sessionStorage pour vérifier que la modale Prevention n'apparaisse qu'une seule fois
if (!sessionStorage.getItem("modalShown")){
const modalContainerPrevention = document.querySelector(".modal-container-prevention");
const messageContainer = document.getElementById("message-prevention");
const birthYearInput = document.getElementById("birthYear");
const ageForm = document.getElementById("ageForm");
const checkAgeButton = document.getElementById("checkAgeButton");

//pour savoir si on a la majorité (en France) peu importe l'année qu'on soit
const currentYear = new Date().getFullYear();
birthYearInput.max = currentYear.toString();
let ageVerified = false; 
modalContainerPrevention.style.display ="block"
checkAgeButton.addEventListener("click", function(event) {
    event.preventDefault()
    const birthYear = parseInt(birthYearInput.value);

// L'utilisateur n'a pas entré d'année de naissance
    if (isNaN(birthYear)) {
    
        const errorMessage = document.getElementById("birthYear-error");
        errorMessage.style.display = "block";
        const errorInput = document.getElementById("birthYear");
        errorInput.classList.add("error-input");
// Sortez de la fonction
        return; 
    }

    const age = currentYear - birthYear;
    const errorMessage = document.getElementById("birthYear-error");
    errorMessage.style.display = "none";
    const errorInput = document.getElementById("birthYear");
    errorInput.classList.remove("error-input");
//Si l'utilisateur n'a pas 18ans
    if (age < 18) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = "Désolé, nous ne pouvons pas te laisser profiter et t'amuser avec de l'alcool!";
        messageContainer.innerHTML = "";
        messageContainer.appendChild(messageDiv);
        messageContainer.style.display = "flex";
// Je retarde la redirection vers Google de 3 secondes 
   setTimeout(function() {
        window.location.href = "https://www.google.fr";
    }, 3000);
    modalContainerPrevention.style.display = "none";
//Si + de 18ans, la personne peut profiter du site
    } else if (!ageVerified) {
        ageVerified = true; 
    }
   sessionStorage.setItem("modalShown", "true");
    modalContainerPrevention.style.display = "none";
   
  });
  
}
