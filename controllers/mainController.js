const ingredientDataMapper = require('../models/ingredientDataMapper')

const mainController = {
  // AFFICHE LA PAGE D'ACCUEIL
  async renderHomePage (req,res){
    const isAuthenticated = res.locals.isAuthenticated;
    let currentRoute = 'accueil';
    res.render('homePage', { currentRoute, isAuthenticated });
  },

  // AFFICHE LES MENTIONS LEGALES
  async renderLegalNoticePage (req,res){
    res.render('legalNoticePage');
  },

  // GENERE UNE RECETTE ALEATOIRE AVEC ALCOOL
  async getRandomRecipe(req, res){
    const randomIngredients = await ingredientDataMapper.getRandomIngredients();
    res.json(randomIngredients);
  },

  // GENERE UNE RECETTE ALEATOIRE SANS ALCOOL
  async getRandomVirginRecipe(req, res){
      const randomVirginIngredients = await ingredientDataMapper.getRandomVirginIngredients();
      res.json(randomVirginIngredients);
  }
};

module.exports = mainController;