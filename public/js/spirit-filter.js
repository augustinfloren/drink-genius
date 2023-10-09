//-----------LA MODALE FILTRE-----------//
// Chercher la modale pour le spirit filtre
const modalSpirit = document.querySelector(".modal-container-spirit");

// Pour ouvrir la modale
const openModal = document.querySelector(".spirit-modal-trigger-open");
//Lorsque je clique sur "Filtres"
openModal.addEventListener("click", openModalSpirit);

function openModalSpirit() {
  modalSpirit.classList.toggle("active");
}

//Fermer la modale
const closeModal = document.querySelectorAll(".spirit-modal-trigger");
closeModal.forEach((trigger) =>
  trigger.addEventListener("click", toggleModalClosure)
);
function toggleModalClosure() {
  modalSpirit.classList.toggle("active");
}

//-----------LA SELECTION D'ALCOOL(S)-----------//
//On récupère le formulaire avec les checkboxes
const spiritForm = document.getElementById("spiritsForm");
spiritForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const checkboxes = Array.from(document.getElementsByName("spirit"));
  const checkedCheckboxes = checkboxes.filter((checkbox) => {
    return checkbox.checked;
  });
  //On sélectionne l'id de la checkbox cochée
  const ids = checkedCheckboxes.map((checkbox) => {
    return checkbox.id;
  });
  //on fait appel au back pour récupérer les noms des spirits
  fetch("/cocktails", {
    method: "POST",
    body: JSON.stringify({ spirits: ids }),

    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData);
        });
      }
      return response.json();
    })
    // On va sélectionner les cocktails de la cocktailsList
    .then((data) => {
      let cocktails = document.getElementsByClassName("cocktail");

      let cocktailsElt = [];

      for (let i = 0; i < cocktails.length; i++) {
        // On va trier cette liste de cocktails à l'intérieur de la fonction map
        let cocktailElt = cocktails[i].getElementsByClassName("cocktail-img");
        data.map((cocktailListFiltered) => {
          //Si le spirit correspond à un spirit apparenant à un cocktail,
          //on le push
          if (cocktailElt[0].id == cocktailListFiltered.id) {
            cocktailsElt.push(i);
          }
          cocktails[i].style.display = "none";
        });
      }
      //on fait apparaitre les cocktails contenant le spirit sélectionné
      cocktailsElt.map((element_id) => {
        cocktails[element_id].style.display = "flex";
      });

      
      toggleModalClosure();
    });
});
