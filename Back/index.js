// Modules
const express = require('express');
const session = require('express-session');
const pg = require('pg');
const router = require('./router');

// Configuration de l'app
const app = express();
app.set("view engine", "ejs");
app.set("views", "../front/views");
app.use(router);
app.use(express.static("../front/public"));

//Configuration des sessions
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_SESSION
}));

//Lancement du serveur
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});
