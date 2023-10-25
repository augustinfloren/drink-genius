const router = require("express").Router();
const { mainController, cocktailsController, userController } = require('./controllers');
const cw = require("./controllers/middlewares/controllerWrapper");
const validationService = require("./services/validationService");
const middleware404 = require("./controllers/middlewares/middleware404");
// const auth = require("./controllers/middlewares/authMiddleware");
const auth = require('./controllers/middlewares/auth');

// Accueil
router.get("/", cw(mainController.renderHomePage));
router.get("/legalnotice", cw(mainController.renderLegalNoticePage));

// Générateur
router.get("/random", cw(mainController.getRandomRecipe));
router.get("/randomvirgin", cw(mainController.getRandomVirginRecipe));

// Cocktails
router.get("/cocktails", cw(cocktailsController.renderAllCocktailsPage));
router.get("/cocktail/:id", cw(cocktailsController.renderCocktailInfoPage));

// Filtre
router.post("/cocktails",cw(cocktailsController.filterCocktailsBySpirits));

// User - Connexion
router.post("/signin", validationService.checkSignUpData, cw(userController.signUpAndRedirect))
router.post("/login", cw(userController.logInAndRedirect));
router.get("/logout", auth.isAuthed, cw(userController.logOutAndRedirect));
router.delete("/profile", auth.isAuthed, cw(userController.deleteProfile));

// User - Profil
router.get("/profile/parameters", auth.isAuthed, cw(userController.renderProfilePage));
router.patch("/profile", auth.isAuthed, cw(userController.updateProfile));
router.get("/profile/usersfavourites", auth.isAuthed, cw(userController.getFavouriteCocktails));
router.get("/profile/favourites", auth.isAuthed, cw(userController.renderFavouritesPage));
router.post("/profile/favourites", auth.isAuthed, cw(userController.addToFavouritesByUser));
router.delete("/profile/favourites", auth.isAuthed, cw(userController.deleteFavourite))
router.get("/profile/newcocktail", auth.isAuthed, cw(userController.renderNewCocktailPage));
router.post("/profile/newcocktail", auth.isAuthed, cw(userController.addNewCocktail));
router.get("/ingredients", auth.isAuthed, cw(userController.displayIngredients));
router.get("/profile/usercocktails", auth.isAuthed, cw(userController.renderUserCocktailsPage));

// Admin
router.get("/admin/cocktails", auth.isAdmin, cw(userController.renderCocktailsManagementPage));
router.post("/admin/cocktail", auth.isAdmin, cw(userController.validateCocktail));
router.delete("/admin/cocktail", auth.isAdmin, cw(userController.deleteCocktail));
router.get("/admin/users", auth.isAdmin, cw(userController.renderUsersManagementPage));
router.delete("/admin/user", auth.isAdmin, cw(userController.deleteProfileByAdmin));

router.use(middleware404);

module.exports = router;
