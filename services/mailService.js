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

// Mail de confirmation d'inscription
async function confirmation_inscription(email, username) {
  const mailConfirmation = {
    from:"drink.genious@gmail.com",
    to: `${email}`,
    subject:"Confirmation d'inscription",
    text:`Bonjour ${username}, votre inscription a bien été confirmée! 
    Va profiter de notre application "Drink Genius" de manière responsable`
  };
  try {
    const info = await transporter.sendMail(mailConfirmation);
    console.log("E-mail de confirmation envoyé : " + info.response);
} catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail : " + error);
}
}
confirmation_inscription(`${email}`,`${username}`)
