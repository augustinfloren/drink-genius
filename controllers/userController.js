const client = require('../models/dbClient');
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
    let { name, instruction, ingredientId, quantity } = req.body;
    const userId = req.session.user.id;

    // CONVERSION DES ID EN INTEGER
    ingredientId = ingredientId.map(el => parseInt(el, 10));
    quantity = quantity.map(el => parseInt(el, 10));
      
    // VERIFICATION DU NOM ENVOYE
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\d'-]+$/;
    if(!regex.test(name)){
      const errorMessage = "Le nom du cocktail ne doit contenir que des lettres et des chiffres."
      return res.status(400).render('errorPage', {errorMessage})
    }
    
    // CONVERSION DE DEUX TABLES EN JSON
    function convertintoJSON(ingredients, quantities){
      const elementsJson = [];
      for (let i = 0; i < ingredients.length; i++){
        const association = {
          ingredient_id : ingredients[i],
          quantity : quantities[i]
        };
        elementsJson.push(association);
      };
      const jsonObject = JSON.stringify(elementsJson);
      return jsonObject;
    };

    const ingredientJson = convertintoJSON(ingredientId, quantity);
    console.log(ingredientJson);

    const result = await cocktailDataMapper.addOneCocktailFunction(name, instruction, userId, ingredientJson);
    // ENVOI EN BDD  
    // AJOUT DANS LA TABLE COCKTAIL
/*     const cocktailResult = await cocktailDataMapper.addOneCocktailByUser(name, instruction, userId);
    const cocktailId = cocktailResult[0].id; */
    

    // AJOUT DES INGREDIENTS ET QUANTITES DANS LA TABLE D'ASSOCIATION
/*     if(Array.isArray(ingredientId)){
      ingredientId.forEach(async (givenIngredient, index) => {
      let givenQuantity = quantity[index];
      const ingredientResult = await ingredientDataMapper.addIngredientToCocktail(cocktailId, givenIngredient, givenQuantity);
    });
  } else {
      const ingredientResult = await ingredientDataMapper.addIngredientToCocktail(cocktailId, ingredientId, quantity);
    } */
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
    const result = await userDataMapper.addToFavourites(userId, cocktailId);
    if (result.error) {
      res.status(400).json(result.error);
    } else {
      res.status(200).json("Cocktail ajouté aux favoris avec succès!");
    }
  },

  async deleteFavourite(req, res){
    const userId = req.session.user.id;
    const cocktailId = req.body.cocktailId;
    const result = await userDataMapper.deleteFromFavourites(userId, cocktailId);
    if (result.error) {
      res.status(400).json(result.error);
    } else {
      res.status(200).json("Cocktail supprimé des favoris avec succès!");
    }
  },

  async getFavouriteCocktails(req,res){
    const userId = req.session.user.id;
    const favourites = await userDataMapper.getFavourites(userId);
    res.json(favourites);
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
    const cocktailId = req.body.cocktailId;
    const validation = await cocktailDataMapper.updateCocktailStatus(cocktailId);
    if(validation.rowCount>0){
      res.json("Cocktail validé");
    } else {
      console.log(result.error)
    }
  },

  async deleteCocktail(req, res){
    const cocktailId = req.body.cocktailId;
    const deletion = await cocktailDataMapper.deleteCocktail(cocktailId);
    if(deletion.rowCount>0){
      res.json("Cocktail supprimé");
    } else {
      console.log(result.error)
    }
  },

  async renderUsersManagementPage(req, res){
    const userAccounts = await userDataMapper.getAllUsers();
    currentRoute = "admin/users";
    res.render('manageUsers', {userAccounts, currentRoute});
  },

  async deleteProfileByAdmin(req,res){
    const userId = req.body.userId
    const deletedProfile = await userDataMapper.deleteUser(userId);
    if(deletedProfile>0){
    res.json("Compte supprimé")
    }
  },
};

module.exports = userController;
