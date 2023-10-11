const ingredientDataMapper = require('../models/ingredientDataMapper');
const cocktailDataMapper = require('../models/cocktailDataMapper');
const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');
const sendConfirmationMail = require ("../services/mailService");
let currentRoute = "";

const userController = {
  async signUpAndRedirect (req, res, next){
    const newUser = req.body;
    newUser.roleId = 2;
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const { error,result } = await userDataMapper.addOneUser(newUser);
      if (error) {
        res.status(400).json(error);
      } else {
        sendConfirmationMail(newUser.email,newUser.firstname);
        res.status(200).json("Inscription validée ! vous pouvez maintenant vous connecter");
      }
    }
  },
  async sendingMailConfirmation (req,res){
    const {email, firstname} = req.body;
    res.status(200).json(true);
  },

  async logInAndRedirect(req, res, next){
    const { email, password } = req.body;
    const { error, result } = await userDataMapper.getUserByEmail(email);
    if (error) {
      res.status(400).json(error);
    }
    else {
      const correctPassword = await bcrypt.compare(password, result.password);
      if(correctPassword){
        delete result.password;
        req.session.user = result;
        res.status(200).json("Vous êtes maintenant connecté !");
      }
      else {
        res.status(400).json("Mot de passe incorrect.");
      }
    }
  },

  async getProfilePage (req, res) {
    const userInfo = req.session.user;
    currentRoute = "profile";
    res.render('profilePage', {userInfo, currentRoute});
  },

  async logOutAndRedirect(req, res){
    req.session.user = null;
    res.redirect("/");
  },

  async renderFavouritesPages(req, res){
    const userId = req.session.user.id;
    const favourites = await userDataMapper.getFavourites(userId);
    currentRoute = 'favourites';
    const userInfo = req.session.user;
    res.render('favouritesPage', {favourites, currentRoute, userInfo});
  },

  async renderNewCocktailPage(req,res){
    const ingredients = await ingredientDataMapper.getAllIngredients();
    currentRoute = "newCocktail";
    const userInfo = req.session.user;
    res.render('newCocktail', {ingredients, currentRoute, userInfo});
  },

  async addNewCocktail(req, res){
    const { name, instruction } = req.body;
    const userId = req.session.user.id;
    const cocktailResult = await cocktailDataMapper.addOneCocktailByUser(name, instruction, userId);
    const cocktailId = cocktailResult[0].id;
    const { ingredientId, quantity } = req.body;
    if(Array.isArray(ingredientId)){
    ingredientId.forEach(async (givenIngredient, index) => {
      let givenQuantity = quantity[index];
      const ingredientResult = await ingredientDataMapper.addIngredientToCocktail(cocktailId, givenIngredient, givenQuantity);
    });} else {
      const ingredientResult = await ingredientDataMapper.addIngredientToCocktail(cocktailId, ingredientId, quantity);
    }
    res.redirect('/profile/usercocktails');
  },

  async renderUserCocktailsPage(req, res){
    const userId = req.session.user.id;
    const userCocktails = await userDataMapper.getUserCocktails(userId);
    const userInfo = req.session.user;
    currentRoute = "usercocktails";
    res.render('userCocktailsPage', {userCocktails, currentRoute, userInfo});
  },

  async getAllIngredients(req, res){
    const ingredients = await ingredientDataMapper.getAllIngredients();
    res.json(ingredients);
  },

  // AJOUT DE COCKTAILS FAVORIS AU COMPTE DE L'UTILISATEUR
  async addToFavouritesByUser(req, res) {
    const cocktailId = req.body.cocktailId;
    const userId = req.session.user.id;
    console.log("cocktailId du controller :", cocktailId);
    console.log("userId du controller :", userId);
    const result = await userDataMapper.addToFavourites(userId, cocktailId);
    console.log(result);
    if (result.error) {
      res.status(400).json(result.error);
    } else {
      res.status(200).json("Cocktail ajouté aux favoris avec succès!");
    },

  async updateProfile(req, res) {
    const userId = req.session.user.id;
    const parameters = req.body;
    const userInfo = await userDataMapper.updateUser(parameters, userId);
    req.session.user = userInfo;
    res.json(userInfo);
  },

  async deleteProfile(req,res){
    const userId = req.session.user.id;
    const deletedProfile = await userDataMapper.deleteUser(userId);
    if(deletedProfile>0){
    req.session.user = null;
    res.json("Compte supprimé")
    }
  },

  async getCocktailsManagementPage(req, res){
    const notValidatedCocktails = await cocktailDataMapper.getNotValidatedCocktails();
    const userInfo = req.session.user;
    currentRoute = "admin/cocktails"
    res.render('manageCocktails', {notValidatedCocktails, userInfo, currentRoute });
  },

  async validateCocktail(req, res){
    console.log("le body dans le controlleur", req.body);
    const cocktailId = req.body.cocktailId;
    const validation = await cocktailDataMapper.updateCocktailStatus(cocktailId);
    if(validation.rowCount>0){
    res.json("Cocktail validé");
  } else {
    console.log(result.error)
  }
  }
};

module.exports = userController;
