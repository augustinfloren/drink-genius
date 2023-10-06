

const nodemailer = require("nodemailer");
require("dotenv").config();

//informations SMTP
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"drink.geniusofficial@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    },
});
    

const mailConfirmation = {
    from:"drink.genious@gmail.com",
    to: `stephane.andre85@gmail.com`,
    subject:"Confirmation d'inscription",
    text:`Bonjour toi, votre inscription a bien été confirmée! Va profiter de notre application "Drink Genius" de manière responsable`
  };
  try {
    const info = transporter.sendMail(mailConfirmation);
    console.log("E-mail de confirmation envoyé");
} catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail");
}


