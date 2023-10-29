const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();

//informations SMTP
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"drink.geniusofficial@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    },
});

async function sendConfirmationMail (email,firstname, userId) {

    try {
        // Token de validation
        const emailToken = jwt.sign({ userId }, process.env.MAIL_SECRET,
            {
                maxAge: 60 * 60 * 1000,
                sameSite: 'strict',
            });

        const url = `http://localhost:3000/confirmation/${emailToken}`;

        // Envoie du mail de confirmation
        const mailConfirmation = {
            from: "drink.genius@gmail.com",
            to: `${email}`,
            subject: "Confirmation d'inscription",
            text: `Bonjour ${firstname}, Cliquez sur ce lien (valable pendant une heure) pour profiter de notre application "Drink Genius" : <a href="${url}">${url}</a> \n L'équipe de Drink Genius `
        };

        await transporter.sendMail(mailConfirmation);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendConfirmationMail
