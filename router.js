const router = require("express").Router();
const { mainController, cocktailsController, userController, randomController } = require('./controllers')
const cw = require("./controllers/middlewares/controllerWrapper");
const validationService = require("./services/validationService");
const middleware404 = require("./controllers/middlewares/middleware404");

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
<<<<<<< HEAD
router.get("/profile", isAuthed, cw(userController.getProfilePage));
router.patch("/profile", isAuthed, cw(userController.updateProfile));
router.get("/logout", isAuthed, userController.logOutAndRedirect);
router.get("/profile/favourites", isAuthed, cw(userController.renderFavouritesPages));
router.get("/profile/newcocktail", isAuthed, cw(userController.renderNewCocktailPage));
router.delete("/profile", isAuthed, cw(userController.deleteProfile));
router.post("/newcocktail", isAuthed, cw(userController.addNewCocktail));
router.get("/profile/usercocktails", isAuthed, cw(userController.renderUserCocktailsPage));
router.get("/ingredients", isAuthed, userController.getAllIngredients);

// Admin
router.get("/admin/cocktails", isAdmin, cw(userController.getCocktailsManagementPage));
router.post("/admin/cocktail", isAdmin, cw(userController.validateCocktail))

function isAuthed(req, res, next){
    if (!req.session.user){
        res.redirect('/');
    } else {
        next();
    }
};

function isAdmin(req, res, next){
    if(req.session.user && req.session.user.role_id === 1){
        next();
    } else {
        res.status(404).render('404');
    }
}

router.use(middleware404);
=======
router.get("/profile", cw(userController.getProfilePage));
router.patch("/profile", cw(userController.updateProfile));
router.get("/logout", userController.logOutAndRedirect);
router.get("/profile/favourites", cw(userController.renderFavouritesPages));
router.get("/profile/newcocktail", cw(userController.renderNewCocktailPage));
router.delete("/profile", cw(userController.deleteProfile));
router.post("/newcocktail", cw(userController.addNewCocktail));
router.get("/profile/usercocktails", cw(userController.renderUserCocktailsPage));
router.get("/ingredients", userController.getAllIngredients);
router.post("/profile/favourites", cw(userController.addToFavouritesByUser));
router.delete("/profile", cw(userController.deleteProfile))

// Admin
router.get("/admin/cocktails", cw(userController.getCocktailsManagementPage));
router.post("/admin/cocktail", cw(userController.validateCocktail))
>>>>>>> 903cf82d1124332886afc62bd05854b1fffb8175

module.exports = router;
