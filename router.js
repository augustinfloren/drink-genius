const router = require("express").Router();
const { mainController, cocktailsController, userController } = require('./controllers')
const cw = require("./controllerWrapper");


// VISITEUR

// Accueil
router.get("/", cw(mainController.getHomePage));

// Cocktails
router.get("/cocktails", cw(cocktailsController.getAllCocktailsPage));
router.get("/cocktail/:id", cw(cocktailsController.getCocktailInfoPage));
router.post("/profile/newcocktail", cw(cocktailsController.addCocktailByUserPage));
router.post("/admin/newcocktail", cw(cocktailsController.addCocktailByAdminPage));

// User
router.post("/signin", cw(userController.signInPage))
router.get("/login", cw(userController.logInPage))
router.get("/profile", cw(userController.getProfilePage));

module.exports = router;

