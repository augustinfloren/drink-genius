// Modules
require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const session = require("express-session");
const router = require("./router");
const jwt = require('jsonwebtoken');
const checkAuth = require('./services/checkAuth');

const PORT = process.env.PORT || 3000;

// Configuration de l'app
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(cookieParser());

app.use(checkAuth);

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
