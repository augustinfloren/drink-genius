

//-----------LA MODALE FILTRE-----------//
// Chercher la modale pour le spirit filtre
const modalSpirit = document.querySelector(".modal-container-spirit");

// Pour ouvrir la modale
const openModal = document.querySelector(".spirit-modal-trigger-open");
console.log("euh??:",openModal);
//Lorsque je clique sur "Filtres"
openModal.addEventListener("click", openModalSpirit)
console.log("euh:",openModal);
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

const spiritForm = document.getElementById("spiritsForm")
spiritForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/cocktails', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(new FormData(spiritForm))),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête');
    }

    const data = await response.json();

    // Traitez les données (par exemple, mettez-les à jour dans votre interface utilisateur)
    console.log(data);
  } catch (error) {
    console.error('Erreur', error);
  }
});


/*const form = {
formSpirit : document.getElementById("spiritsForm"),
checkboxes : Array.from(document.getElementsByName("spirit")),
spirits: [],

handleClicked: async(event) => {
  event.preventDefault();
  if(form.checkboxes.checked){
    await form.getCocktailsBySpirits()
  }
},
getCocktailsBySpirits: ()=> {
  return fetch("/cocktailsFilter",{
    method: "POST",
    header:{
      "content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok){
        throw new Error('la requete a échoué')
    }
    return response.json();
})
.then(data => {
  form.spirits = data;
  console.log("tralalala:",form.spirits)
})
.catch(error => {
  console.error('Erreur', error)
})},
}
form.formSpirit.addEventListener("click", form.handleClicked);
*/

/*const form = document.getElementById("spiritsForm");
form.addEventListener("submit", (event)=>{
  event.preventDefault()
  console.log("je:",event)
const checkboxes = Array.from(document.getElementsByName("spirit"))
console.log("je je", checkboxes)

const checkedCheckboxes = checkboxes.filter((checkbox)=>{
  return checkbox.checked
})
console.log("jejejeje:", checkedCheckboxes)
const ids = checkedCheckboxes.map((checkbox)=>{
  return checkbox.id
})
const cocktails = getCocktailBySpirits(ids)
console.log("toitoi:",cocktails)
});*/

/*
 const spirit_id = Array.from(document.querySelectorAll('input[name="spirits"]:checked')).map(checkbox => checkbox.value);
console.log("je:",spirit_id)
//Récuperer les spirits
const response = fetch("/cocktails", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ spirits: spirit_id }),
});

if (response.ok) {
  const cocktails = response.json();
  // Traitez les données (cocktails) renvoyées par le serveur ici
  console.log(cocktails);
} else {
  // Gérez les erreurs de réponse ici
  const errorMessage = response.text();
  console.error("Erreur de serveur :", errorMessage);
}
;

console.log("là:", spirit_id)*/





















/*//tableau pour stocker les spiritueux
let spirits = [];
//Récuperer les spirits
const fetchSpirits = () => {
  return fetch("/cocktails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("la requete a échoué");
      }
      return response.json();
    })
    .then((data) => {
      const spirits = data;
      console.log("je passe", spirits);
    })
    .catch((error) => {
      console.error("Erreur", error);
    });
};
console.log("je passe:", spirits);

// Chercher les checkbox
const selectSpirits = document.querySelectorAll(".checkbox");
//chercher le bouton validation
const buttonValidation = document.querySelector(".spirit-modal-btn");

//mettre un listener aux cases cochées
selectSpirits.forEach((checkbox) => {
  checkbox.addEventListener("click", (event) => {
    // J'accède à la ou les checkbox
    const isChecked = checkbox.checked;

    //mettre un listerner sur le bouton "valider"
    buttonValidation.addEventListener("click", (event) => {
      // Si j'ai une checkbox cochée
      if (isChecked) {
        fetchSpirits();
      } else {
        const index = spirits.indexOf(spirit);
        if (index !== -1) {
          spirits.splice(index, 1);
        }
      }
    });
  });
});*/


/*// Stocker les spiriteux
let selectedSpirits = [];
const fetchSpirits = async () => {
    try {
      const response = await fetch("/cocktails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("La requête a échoué");
      }
      
      const data = await response.json();
      console.log("spiritueux :", data)
      ;
    } catch (error) {
    }
  };
  // Ajoutez un gestionnaire d'événements "click" à chaque case à cocher
const selectSpirits = document.querySelectorAll(".checkbox");
selectSpirits.forEach((checkbox) => {
  checkbox.addEventListener("click", (event) => {
    updateSelectedSpirits(checkbox); // Mettez à jour la liste des alcools sélectionnés
  });
});
// Fonction pour mettre à jour la liste des alcools sélectionnés
function updateSelectedSpirits(checkbox) {
  const spiritName = checkbox.value;

  if (checkbox.checked) {
    // Si la case est cochée, ajoutez l'alcool à la liste
    selectedSpirits.push(spiritName);
  } else {
    // Si la case est décochée, retirez l'alcool de la liste
    const index = selectedSpirits.indexOf(spiritName);
    if (index !== -1) {
      selectedSpirits.splice(index, 1);
    }
  }
}

// Fonction pour effectuer une action lorsque le bouton de validation est cliqué
async function handleValidationClick(event) {

  if (selectedSpirits.length > 0) {
    // Si au moins une case à cocher est cochée, effectuez une action ici (par exemple, appeler fetchSpirits())
    await fetchSpirits();
  } else {
    // Gérez le cas où aucune case à cocher n'est cochée (selon vos besoins)
    console.log("Aucun alcool sélectionné.");
  }
}
// Ajoutez un gestionnaire d'événements "click" au bouton de validation
const buttonValidation = document.querySelector(".spirit-modal-btn");
buttonValidation.addEventListener("click", handleValidationClick);*/

  

/*// Ici on crée un tableau cocktail. Le fetch vient appeler le back pour compléter ton tableau qui contiendra tous les cocktails
let cocktails = [];
const fetchCocktails = () => {
    return fetch("/cocktails", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        return response.json();
    })
    .then(data => {
        cocktails = data;
    })
    
};
//  Fonction pour filtrer les cocktails en fonction des boissons sélectionnées
const filterCocktailsBySpirits = (selectedSpirits) => {
    return cocktails.filter(cocktail => {
        // Ici on fait filter pour créer un nouveau tableau qui sera retourné
        // On vérifie si au moins une des boissons sélectionnées est présente dans les ingrédients du cocktail (je te laisse regarder la doc de some et de includes)
        return cocktail.ingredients.some(ingredient => selectedSpirits.includes(ingredient));
    });
};
const submitSpiritsSelection = () => {
    const buttonValidation = document.querySelector(".spirit-modal-btn");
    buttonValidation.addEventListener("click", async (event) => {
        // Ce tableau contiendra les les boissons sélectionnées
        const selectedSpirits = [];
        const selectSpirits = document.querySelectorAll(".checkbox");
        selectSpirits.forEach(checkbox => {
            if (checkbox.checked) {
                selectedSpirits.push(checkbox.value); // On stocke les boissons sélectionnées dans le tableau
            }
        });

        // On appelle la fonction de filtre en lui donnant le tableau contenant les boissons sélectionnées
        const filteredCocktails = filterCocktailsBySpirits(selectedSpirits);

        console.log(filteredCocktails); // On obtient les cocktails filtrés
    });
}

// Au début on appelle notre fonction qui vient fetch
fetchCocktails();
// Puis on finit la sélection de boissons et l'écouteur d'événement
submitSpiritsSelection();*/

/*//Récuperer les spirits
let spirits = [];
const fetchSpirits=() => {
     return fetch("/cocktails",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok){
            throw new Error('la requete a échoué')
        }
        return response.json();
    })
    .then(data => {
       const spirits = data;
        console.log("je passe",spirits)
    })
    .catch(error => {
      
    })};
    console.log("je passe:",spirits)

//ajouter un listener sur le bouton validé
const spiritsButtonEventListener= () => {
    let buttonValidation = document.querySelector(".spirit-modal-btn");
    let selectSpirits = document.querySelectorAll(".checkbox");
    buttonValidation.addEventListener("click", async function(event){
        event.preventDefault();
        if (selectSpirits.checked){
            await fetchSpirits();
        }

    })
}*/

/*// Soumettre la sélection
const submitSpiritsSelection = () => {
    // Chercher les checkboxs et y mettre un listener
    const selectSpirits = document.querySelectorAll(".checkbox");
    selectSpirits.forEach(checkbox => {
        checkbox.addEventListener("click", (event) => {
            // J'accède à la ou les checkbox
            const isChecked = checkbox.checked;
            const spirit = event.currentTarget.value;
            
            // Si j'ai une checkbox cochée
            if (isChecked) {
                spirits.push(spirit);
            } else {
                const index = spirits.indexOf(spirit);
                if (index !== -1) {
                    spirits.splice(index, 1);
                }
            }
        });
    });


//Chercher le bouton de validation de sa sélection et y mettre un listener
const buttonValidation = document.querySelector(".spirit-modal-btn");
buttonValidation.addEventListener("click", async (e) => {
    e.preventDefault()

    });
}

fetchSpirits()
    submitSpiritsSelection()
    */
