
    const modalContainerPrevention = document.querySelector(".modal-container-prevention");
    const messageContainer = document.getElementById("message-prevention");
    const birthYearInput = document.getElementById("birthYear");
    const ageForm = document.getElementById("ageForm");
    const checkAgeButton = document.getElementById("checkAgeButton");
    const currentYear = new Date().getFullYear();

    birthYearInput.max = currentYear.toString();
    let ageVerified = false; 
    checkAgeButton.addEventListener("click", function(event) {
        event.preventDefault()
        const birthYear = parseInt(birthYearInput.value);
        const age = currentYear - birthYear;

        if (age < 18) {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = "Désolé, nous ne pouvons pas te laisser profiter et t'amuser avec de l'alcool!";
            messageContainer.innerHTML = "";
            messageContainer.appendChild(messageDiv);
            messageContainer.style.display = "flex";
             // Retardez la redirection vers Google de 3 secondes 
       setTimeout(function() {
            window.location.href = "https://www.google.fr";
        }, 3000);
        modalContainerPrevention.style.display = "none"
        } else {
            if (!ageVerified) {
                ageVerified = true; // Marquez l'âge comme vérifié
                modalContainerPrevention.style.display = "none"
                window.location.replace = "http://localhost:3000";
                
            }
             
        }
     
      
    });

