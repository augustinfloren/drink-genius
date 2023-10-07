const router = require("express").Router();
const { mainController, cocktailsController, userController, randomController } = require('./controllers')
const cw = require("./controllerWrapper");
const validationService = require("./services/validationService");

// Accueil
router.get("/", cw(mainController.getHomePage));

// Cocktails
router.get("/cocktails", cw(cocktailsController.getAllCocktailsPage));
router.get("/cocktail/:id", cw(cocktailsController.getCocktailInfoPage));
router.post("/profile/newcocktail", cw(cocktailsController.addCocktailByUserPage));
router.post("/admin/newcocktail", cw(cocktailsController.addCocktailByAdminPage));

//Filtre
router.post("/cocktails",cw(cocktailsController.getCocktailsBySpirits));

// Générateur
router.get("/random", cw(randomController.getRandomIngredients));
router.get("/randomvirgin", cw(randomController.getRandomVirginIngredients));

// User
router.post("/signin", validationService.checkSignUpData, cw(userController.signUpAndRedirect))
router.post("/login", userController.logInAndRedirect)
router.get("/profile", cw(userController.getProfilePage));
router.get("/logout", userController.logOutAndRedirect);

module.exports = router;