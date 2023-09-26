const router = require("express").Router();
const mainController = require("./controllers/mainController");
const cw = require("./controllerWrapper");


// VISITEUR

// Accueil
router.get("/", cw(mainController.getHomePage));


/*// Connexion
router.post("/signup", cw(userController.signup));
router.post("/login", cw(userController.login));

// Récupère la liste des cocktails
router.get("/cocktails", cw(cocktailsController.getCocktailsList));

// Récupère un cocktail
router.get("/cocktail", cw(cocktailsController.getCocktail));

// MEMBRE

router.get("/profile/:id", cw())*/



module.exports = router;

