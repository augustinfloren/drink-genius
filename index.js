// Modules
require("dotenv").config();

const express = require("express");
// const session = require("express-session");
const router = require("./router");

const PORT = process.env.PORT || 3000;

// Configuration de l'app
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(router);
app.use(express.static("./public"));

//Configuration des sessions
/*app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_SESSION
}));*/

//Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
