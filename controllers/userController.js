const ingredientDataMapper = require('../models/ingredientDataMapper');
const cocktailDataMapper = require('../models/cocktailDataMapper');
const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendConfirmationMail = require ("../services/mailService");
let currentRoute = "";

const userController = {
  // INSCRIPTION
  async signUpAndRedirect (req, res, next){
    const newUser = req.body;
    newUser.roleId = 2;
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const { error,result } = await userDataMapper.addOneUser(newUser);
      if (error) {
        res.status(400).json(error);
      } else {
        sendConfirmationMail(result.email,result.firstname, result.id);
        res.status(200).json("Merci de cliquer sur le lien envoyé par mail pour valider l'inscription.");
      }
    }
  },

  // VALIDATION DU MAIL
  async validateMail (req, res) {
    const verifiedUser = jwt.verify(req.params.token, process.env.MAIL_SECRET);
    await userDataMapper.validateUser(verifiedUser.id);
    res.clearCookie('jwt');
    res.status(200).redirect('/?confirmed=true');
  },

  // CONNEXION
  async logInAndRedirect(req, res, next){
    const { email, password } = req.body;
    const { error, result } = await userDataMapper.getUserByEmail(email);
    if (error) {
      res.status(400).json(error);
    }
    else {
      const correctPassword = await bcrypt.compare(password, result.password);
      if(correctPassword){
        if (result.confirmed) {
          delete result.password;
          req.session.user = result;
          res.status(200).json("Vous êtes maintenant connecté !");
        } else {
          res.status(400).json("Email non vérifié.");
        }
      }
      else {
        res.status(400).json("Mot de passe incorrect.");
      }
    }
  },

  // AFFICHAGE DE LA PAGE DE PROFIL
  async renderProfilePage(req, res) {
    const userInfo = req.session.user;
    currentRoute = "profile";
    res.render('profilePage', {userInfo, currentRoute});
  },

  // DECONNEXION
  async logOutAndRedirect(req, res){
    req.session.user = null;
    res.redirect("/");
  },

  // AFFICHAGE DE LA PAGE DES COCKTAILS FAVORIS
  async renderFavouritesPages(req, res){
    const userId = req.session.user.id;
    const favourites = await userDataMapper.getFavourites(userId);
    currentRoute = 'favourites';
    const userInfo = req.session.user;
    res.render('favouritesPage', {favourites, currentRoute, userInfo});
  },

  // RECUPERATION DES COCKTAILS FAVORIS
  async getFavouriteCocktails(req,res){
    const userId = req.session.user.id;
    const favourites = await userDataMapper.getFavourites(userId);
    res.json(favourites);
  },

  // AFFICHE DE LA PAGE D'AJOUT D'UN NOUVEAU COCKTAIL
  async renderNewCocktailPage(req,res){
    const {result, error} = await ingredientDataMapper.getAllIngredients();
    const ingredients = result;
    currentRoute = "newCocktail";
    const userInfo = req.session.user;
    if(error){
      res.render('errorPage', {errorMessage : "Création de cocktail impossible pour le moment. Merci de réessayer ultérieurement."})
    } else { 
      res.render('newCocktail', {ingredients, currentRoute, userInfo});
    }
  },

  // AJOUT D'UN COCKTAIL EN BASE DE DONNEES
  async addNewCocktail(req, res){
    let { name, instruction, ingredientId, quantity } = req.body;
    const userId = req.session.user.id;

    // CONVERSION DES ID EN INTEGER
      ingredientId = ingredientId.map(el => parseInt(el, 10));
      quantity = quantity.map(el => parseInt(el, 10));

    // VERIFICATION DU NOM ENVOYE
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\d\s'-]+$/;
    if(!regex.test(name)){
      const errorMessage = "Le nom du cocktail ne doit contenir que des lettres et des chiffres."
      return res.status(400).render('errorPage', {errorMessage})
    }

    // VERIFICATION DE L'INSTRUCTION ENVOYE
    if(!regex.test(instruction)){
      const errorMessage = "Les instructions du cocktail ne doit contenir que des lettres et des chiffres."
      return res.status(400).render('errorPage', {errorMessage})
    }

    // CONVERSION DE DEUX TABLEAUX EN JSON
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

    const {result, error} = await cocktailDataMapper.addOneCocktailFunction(name, instruction, userId, ingredientJson);
    if(result){
      res.redirect('/profile/usercocktails');
    } else {
      const errorMessage = error;
      res.render('errorPage', {errorMessage})
  }
},

// AFFICHAGE DES COCKTAILS CREES PAR L'UTILISATEUR
  async renderUserCocktailsPage(req, res){
    const userId = req.session.user.id;
    const userCocktails = await userDataMapper.getUserCocktails(userId);
    const userInfo = req.session.user;
    currentRoute = "usercocktails";
    res.render('userCocktailsPage', {userCocktails, currentRoute, userInfo});
  },

  // RECUPERATION DE TOUS LES INGREDIENTS
  async displayIngredients(req, res){
    const { result, error } = await ingredientDataMapper.getAllIngredients();
    const ingredients = result;
    if(ingredients){
    res.json(ingredients);
    } else {
      res.json(error);
    }
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

  // SUPPRESSION D'UN COCKTAIL DES FAVORIS
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

  // MISE A JOUR DES INFORMATIONS DE PROFIL
  async updateProfile(req, res) {
    const userId = req.session.user.id;
    const {firstname, lastname, birthdate, email, location, hobbies} = req.body;
    const userInfo = await userDataMapper.updateUser(firstname, lastname, birthdate, email, location, hobbies, userId);
    req.session.user = userInfo;
    res.json(userInfo);
  },

  // SUPPRESSION DU COMPTE UTILISATEUR
  async deleteProfile(req,res){
    const userId = req.session.user.id;
    const deletedProfile = await userDataMapper.deleteUser(userId);
    if(deletedProfile>0){
    req.session.user = null;
    res.json("Compte supprimé")
    }
  },

  // AFFICHAGE DES COCKTAILS NON VALIDES
  async renderCocktailsManagementPage(req, res){
    const { error, result } = await cocktailDataMapper.getNotValidatedCocktails();
    const notValidatedCocktails = result;
    console.log(result);
    const userInfo = req.session.user;
    currentRoute = "admin/cocktails";
    if(error){
      res.render('cocktailListPage', {error, currentRoute});
    } else {
      res.render('manageCocktails', {notValidatedCocktails, error, userInfo, currentRoute });
    }
  },

  // VALIDATION D'UN COCKTAIL
  async validateCocktail(req, res){
    const cocktailId = req.body.cocktailId;
    const {result, error} = await cocktailDataMapper.updateCocktailStatus(cocktailId);
    const validation = result;
    if(validation.rowCount>0){
      res.json("Cocktail validé");
    } else {
      res.json(error);
    }
  },

  // SUPPRESSION D'UN COCKTAIL
  async deleteCocktail(req, res){
    const cocktailId = req.body.cocktailId;
    const {error, result} = await cocktailDataMapper.deleteCocktail(cocktailId);
    const deletion = result;
    if(deletion.rowCount>0){
      res.json("Cocktail supprimé");
    } else {
      console.log(result.error)
    }
  },

  // AFFICHAGE DE LA PAGE DE TOUS LES UTILISATEURS
  async renderUsersManagementPage(req, res){
    const {result, error} = await userDataMapper.getAllUsers();
    const userAccounts = result;
    currentRoute = "admin/users";
    if(error){
      res.render('manageUsers', {error, currentRoute})
    } else {
    res.render('manageUsers', {userAccounts, error, currentRoute});
    }
  },

  // SUPPRESSION D'UN COMPTE UTILISATEUR
  async deleteProfileByAdmin(req,res){
    const userId = req.body.userId;
    const deletedProfile = await userDataMapper.deleteUser(userId);
    if(deletedProfile>0){
    res.json("Compte supprimé")
    }
  },

  // MISE A JOUR DU ROLE
  async updateUserRole(req,res){
    const userId = req.body.userId;
    const updatedProfile = await userDataMapper.updateRoleToAdmin(userId);
    res.json("Role mis à jour")
  }
};

module.exports = userController;
