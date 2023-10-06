

//On récupére le form de la modal
const inscriptionModal = document.getElementById(auth-modal-form)
//On met un listener
inscriptionModal.addEventListener("submit", async (event)=>{
    event.preventDefault();
})
console.log("je passe:",inscriptionModal)
//On met les données nécessaires du form pour l'envoi d email de confirmation d'inscription
    // Collectez les données du formulaire
    const email = document.getElementById("email-input").value;
    const firstname = document.getElementById("prenom-input").value;

// On stock les données dans un objet
    const inscriptionData = {
        email,
        firstname,
    };
    console.log("je passe la:",inscriptionData)
// J'envoie le mail de confirmation 
    await confirmation_inscription(inscriptionData);


// Mail de confirmation d'inscription
async function confirmation_inscription(email, firstname) {
    const mailConfirmation = {
      from:"drink.genious@gmail.com",
      to: `${email}`,
      subject:"Confirmation d'inscription",
      text:`Bonjour ${firstname}, votre inscription a bien été confirmée! Va profiter de notre application "Drink Genius" de manière responsable`
    };
    try {
      const info = await transporter.sendMail(mailConfirmation);
      console.log("E-mail de confirmation envoyé : " + info.response);
  } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail : " + error);
  }
  }
  confirmation_inscription(email, firstname)
  
