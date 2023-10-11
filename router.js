const router = require("express").Router();
const { mainController, cocktailsController, userController, randomController } = require('./controllers')
const cw = require("./services/controllerWrapper");
const validationService = require("./services/validationService");

// Accueil
router.get("/", cw(mainController.getHomePage));
router.get("/legalnotice", cw(mainController.getLegalNoticePage));

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
router.post("/login", userController.logInAndRedirect);
router.get("/profile", cw(userController.getProfilePage));
router.patch("/profile", cw(userController.updateProfile));
router.get("/logout", userController.logOutAndRedirect);
router.get("/profile/favourites", cw(userController.renderFavouritesPages));
router.get("/profile/newcocktail", cw(userController.renderNewCocktailPage));
router.delete("/profile", cw(userController.deleteProfile));
router.post("/newcocktail", cw(userController.addNewCocktail));
router.get("/profile/usercocktails", cw(userController.renderUserCocktailsPage));
router.get("/ingredients", userController.getAllIngredients);


module.exports = router;
