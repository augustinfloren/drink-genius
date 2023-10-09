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
    
function sendConfirmationMail (email,firstname) {

    // On envoie le mail de confirmation
    const mailConfirmation = {
      from: "drink.genius@gmail.com",
      to: `${email}`,
      subject: "Confirmation d'inscription",
      text: `Bonjour ${firstname}, votre inscription a bien été confirmée! Va profiter de notre application "Drink Genius" de manière responsable.\n L'équipe de Drink Genious `
    };
    transporter.sendMail(mailConfirmation)
};

module.exports = sendConfirmationMail