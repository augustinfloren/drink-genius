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
    // Variable pour voir un spirit a été truvé
      let spiritFound = false;
      const messageContainer = document.getElementById("message-container");
      let spiritToSearch;
      const selectedSpirits = checkedCheckboxes.map((checkbox) => {
        return checkbox.value; // Utilisez la valeur de la case à cocher comme nom de l'alcool
      });

      for (let i = 0; i < cocktails.length; i++) {
    // On va trier cette liste de cocktails à l'intérieur de la fonction map
        let cocktailElt = cocktails[i].getElementsByClassName("cocktail-img");
        let currentCocktailSpiritId = cocktailElt[0].id;

    // Réinitialise la variable spiritFound pour chaque itération
        spiritFound = false;
        
      
        data.map((cocktailListFiltered) => {
    //Si le spirit correspond à un spirit apparenant à un cocktail,
    //on le push
          if (currentCocktailSpiritId == cocktailListFiltered.id) {
            cocktailsElt.push(i);
            spiritFound = true;
          }
        });
    // On masque le cocktail si on ne trouve pas de spirit
        if (!spiritFound) {
          cocktails[i].style.display = "none";
        }
        spiritToSearch = spiritFound
      }
    // Crée un élément div pour le message d'erreur
      const messageDiv = document.createElement("div");
    // Vérifie si aucun spirit n'a été trouvé
      if (cocktailsElt.length === 0) {
        messageDiv.textContent =
        `Désolé, nous n'avons pas de cocktails à base de ${selectedSpirits.join(', ')}`;
      } else {
      //on fait apparaitre les cocktails contenant le spirit sélectionné
        cocktailsElt.map((element_id) => {
          cocktails[element_id].style.display = "flex";
        });
      }
      // Ajoute le message au conteneur HTML
messageContainer.appendChild(messageDiv);
      toggleModalClosure();
    });
});

