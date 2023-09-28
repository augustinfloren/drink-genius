
//Chercher les modales nécessaires
const modalContainer = document.querySelector(".modal-container");

const modalTriggers = document.querySelectorAll(".modal-trigger");

//lorsque je clique exécuter la fonction toggle qui fait si c'est active ca passe en inactive et vice versa
modalTriggers.forEach(trigger => trigger.addEventListener("click",toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
}
console.log(modalContainer)
console.log(modalTriggers)