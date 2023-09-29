
// //Chercher les modales nécessaires
// const modalContainer = document.querySelector(".modal-container");

// const modalTriggers = document.querySelectorAll(".modal-trigger");

// //lorsque je clique exécuter la fonction toggle qui fait si c'est active ca passe en inactive et vice versa
// modalTriggers.forEach(trigger => trigger.addEventListener("click",toggleModal))

// let modalType = 'login';

function toggleModal(type){
    console.log('LALALA', type)
    modalType = type;
    document.getElementById('modal-container').classList.toggle('active');
    // modalContainer.classList.toggle("active")
}
