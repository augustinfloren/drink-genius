const router = require("express").Router();
const mainController = require("./controllers/mainController");
const cw = require("./controllerWrapper");


// VISITEUR

// Accueil
router.get("/", cw(mainController.getHomePage));

module.exports = router;

