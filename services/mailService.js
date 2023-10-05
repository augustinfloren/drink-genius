const nodemailer = require("nodemailer");
require("dotenv").config();

//informations SMTP
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"drink.genious@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    }
});

// Définissez les dé
const confirmation_inscription = {
    from: "drink.genious@gmail.com", // Adresse e-mail de l'expéditeur
    to: 'stephane.andre85@gmail.com', // Adresse e-mail du destinataire
    subject: 'Votre compte a été crée',
    text: 'test' // Corps de l'e-mail au format texte
};

// Envoyez l'e-mail
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    } else {
      console.log('E-mail envoyé avec succès:', info.response);
    }
  });