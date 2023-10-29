const ingredientDataMapper = require('../models/ingredientDataMapper');
const cocktailDataMapper = require('../models/cocktailDataMapper');
const userDataMapper = require('../models/userDataMapper');
const bcrypt = require('bcrypt');
const sendConfirmationMail = require ("../services/mailService");
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
let currentRoute = "";

const userController = {
  // INSCRIPTION
  async signupAndRedirect (req, res, next){
    const newUser = req.body;
    newUser.roleId = 2;
    newUser.confirmed = false;
    if(newUser.password === newUser.confirmation){
      newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
      const { error,result } = await userDataMapper.addOneUser(newUser);
      if (error) {
        res.status(400).json(error);
      } else {
        console.log(result)
        sendConfirmationMail(result.email,result.firstname, result.id);
        console.log(result.email,result.firstname, result.id)
        res.status(200).json("Inscription validée ! vous pouvez maintenant vous connecter");
      }
    }
  },

  // VALIDATION DU MAIL
  async validateMail (req, res) {
    console.log("ok")
    const verifiedUser = jwt.verify(req.params.token, process.env.MAIL_SECRET);
    await userDataMapper.validateUser(verifiedUser.userId);
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
        const userId = result.id;
        const roleId = result.role_id;
        const token = jwt.sign({ userId, roleId }, process.env.JWT_SECRET);
        const cookieOptions = {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          sameSite: 'strict',
          path: '/',
        };

        res.locals.isAuthed = true;

        res.setHeader('Set-Cookie', cookie.serialize('jwt', token, cookieOptions));

        res.status(200).json({ token });
      }
      else {
        res.status(400).json("Mot de passe incorrect.");
      }
    }
  },

  // AFFICHAGE DE LA PAGE DE PROFIL

  // Récupération des infos de l'utilisateur avec l'id contenu dans son token.
  async renderProfilePage(req, res) {
    const { error, result } = await userDataMapper.getUserById(res.locals.userId);
    delete result.password;
    const userInfos = result;
    currentRoute = "profile";
    res.render('profilePage', {userInfos, currentRoute});
  },

  // DECONNEXION
  async logOutAndRedirect(req, res){
    res.clearCookie('jwt');
    res.redirect("/");
  },

  // AFFICHAGE DE LA PAGE DES COCKTAILS FAVORIS
  async renderFavouritesPage(req, res){
    const userId = res.locals.userId;
    const favourites = await userDataMapper.getFavourites(userId);
    currentRoute = 'favourites';
    res.render('favouritesPage', {favourites, currentRoute});
  },

  // RECUPERATION DES COCKTAILS FAVORIS
  async getFavouriteCocktails(req,res){
    const userId = res.locals.userId;
    const favourites = await userDataMapper.getFavourites(userId);
    res.json(favourites);
  },

  // AFFICHE DE LA PAGE D'AJOUT D'UN NOUVEAU COCKTAIL
  async renderNewCocktailPage(req,res){
    const ingredients = await ingredientDataMapper.getAllIngredients();
    currentRoute = "newCocktail";
    res.render('newCocktail', {ingredients, currentRoute});
  },

  // AJOUT D'UN COCKTAIL EN BASE DE DONNEES
  async addNewCocktail(req, res){
    let { name, instruction, ingredientId, quantity } = req.body;
    const userId = res.locals.userId;

    // CONVERSION DES ID EN INTEGER
      ingredientId = ingredientId.map(el => parseInt(el, 10));
      quantity = quantity.map(el => parseInt(el, 10));

    // VERIFICATION DU NOM ENVOYE
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\d\s'-]+$/;
    if(!regex.test(name)){
      const errorMessage = "Le nom du cocktail ne doit contenir que des lettres et des chiffres."
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

    const result = await cocktailDataMapper.addOneCocktailFunction(name, instruction, userId, ingredientJson);
    if(result){
      res.redirect('/profile/usercocktails');
    } else {
      const errorMessage = "Une erreur serveur est survenue."
      return res.status(500).render('errorPage', {errorMessage})
  }
},

// AFFICHAGE DES COCKTAILS CREES PAR L'UTILISATEUR
  async renderUserCocktailsPage(req, res){
    const userId = res.locals.userId;
    const userCocktails = await userDataMapper.getUserCocktails(userId);
    currentRoute = "usercocktails";
    res.render('userCocktailsPage', {userCocktails, currentRoute});
  },

  // RECUPERATION DE TOUS LES INGREDIENTS
  async displayIngredients(req, res){
    const ingredients = await ingredientDataMapper.getAllIngredients();
    res.json(ingredients);
  },

  // AJOUT DE COCKTAILS FAVORIS AU COMPTE DE L'UTILISATEUR
  async addToFavouritesByUser(req, res) {
    const cocktailId = req.body.cocktailId;
    const userId = res.locals.userId;
    const result = await userDataMapper.addToFavourites(userId, cocktailId);
    if (result.error) {
      res.status(400).json(result.error);
    } else {
      res.status(200).json("Cocktail ajouté aux favoris avec succès!");
    }
  },

  // SUPPRESSION D'UN COCKTAIL DES FAVORIS
  async deleteFavourite(req, res){
    const userId = res.locals.userId;
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
    const userId = res.locals.userId;
    const parameters = req.body;
    const userInfo = await userDataMapper.updateUser(parameters, userId);
    res.json(userInfo);
  },

  // SUPPRESSION DU COMPTE UTILISATEUR
  async deleteProfile(req,res){
    const userId = res.locals.userId;
    const deletedProfile = await userDataMapper.deleteUser(userId);
    if(deletedProfile>0){
      res.json("Compte supprimé")
    }
  },

  // AFFICHAGE DES COCKTAILS NON VALIDES
  async renderCocktailsManagementPage(req, res){
    const notValidatedCocktails = await cocktailDataMapper.getNotValidatedCocktails();
    currentRoute = "admin/cocktails"
    res.render('manageCocktails', {notValidatedCocktails, currentRoute });
  },

  // VALIDATION D'UN COCKTAIL
  async validateCocktail(req, res){
    const cocktailId = req.body.cocktailId;
    const validation = await cocktailDataMapper.updateCocktailStatus(cocktailId);
    if(validation.rowCount>0){
      res.json("Cocktail validé");
    } else {
      console.log(result.error)
    }
  },

  // SUPPRESSION D'UN COCKTAIL
  async deleteCocktail(req, res){
    const cocktailId = req.body.cocktailId;
    const deletion = await cocktailDataMapper.deleteCocktail(cocktailId);
    if(deletion.rowCount>0){
      res.json("Cocktail supprimé");
    } else {
      console.log(result.error)
    }
  },

  // AFFICHAGE DE LA PAGE DE TOUS LES UTILISATEURS
  async renderUsersManagementPage(req, res){
    const userAccounts = await userDataMapper.getAllUsers();
    currentRoute = "admin/users";
    res.render('manageUsers', {userAccounts, currentRoute});
  },

  // SUPPRESSION D'UN COMPTE UTILISATEUR
  async deleteProfileByAdmin(req,res){
    const userId = req.body.userId
    const deletedProfile = await userDataMapper.deleteUser(userId);
    if(deletedProfile>0){
    res.json("Compte supprimé")
    }
  },
};

module.exports = userController;
