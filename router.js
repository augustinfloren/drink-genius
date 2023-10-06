const router = require("express").Router();
<<<<<<< HEAD
const { mainController, cocktailsController, userController,ingredientsController, searchCocktailController } = require('./controllers')
=======
const { mainController, cocktailsController, userController, randomController } = require('./controllers')
>>>>>>> d68411c99594e2f095f79ff1d2e1e07e54830d48
const cw = require("./controllerWrapper");
const validationService = require("./services/validationService");

// Accueil
router.get("/", cw(mainController.getHomePage));

// Cocktails
router.get("/cocktails", cw(cocktailsController.getAllCocktailsPage));
router.get("/cocktail/:id", cw(cocktailsController.getCocktailInfoPage));
router.post("/profile/newcocktail", cw(cocktailsController.addCocktailByUserPage));
router.post("/admin/newcocktail", cw(cocktailsController.addCocktailByAdminPage));

<<<<<<< HEAD
=======
// Générateur
router.get("/random", cw(randomController.getRandomIngredients));
router.get("/randomvirgin", cw(randomController.getRandomVirginIngredients));
>>>>>>> d68411c99594e2f095f79ff1d2e1e07e54830d48

// User
router.post("/signin", validationService.checkSignUpData, cw(userController.signUpAndRedirect))
router.post("/login", userController.logInAndRedirect)
router.get("/profile", cw(userController.getProfilePage));
router.get("/logout", userController.logOutAndRedirect);

module.exports = router;