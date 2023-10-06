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


module.exports = {
  confirmation_inscription
};
