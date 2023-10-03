const router = require("express").Router();
const { mainController, cocktailsController, userController, searchCocktailController } = require('./controllers')
const cw = require("./controllerWrapper");
const validationService = require("./services/validationService");


// VISITEUR

// Accueil
router.get("/", cw(mainController.getHomePage));

// Cocktails
router.get("/cocktails", cw(cocktailsController.getAllCocktailsPage));
router.get("/cocktail/:id", cw(cocktailsController.getCocktailInfoPage));
router.post("/profile/newcocktail", cw(cocktailsController.addCocktailByUserPage));
router.post("/admin/newcocktail", cw(cocktailsController.addCocktailByAdminPage));

// User
router.post("/signin", validationService.checkSignUpData, userController.signInPage)
router.get("/login", cw(userController.logInPage))
router.get("/profile", cw(userController.getProfilePage));
router.get("/logout", cw(userController.logOutPage));




module.exports = router;