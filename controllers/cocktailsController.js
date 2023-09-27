const cocktailDataMapper = require("../models/cocktailDataMapper");

const cocktailsController = {
  async getAllCocktailsPage(req, res){
    const cocktails = await cocktailDataMapper.getValidatedCocktails();
    res.render('cocktailsPage', {cocktails});
  },

  async getCocktailInfoPage(req, res){
    const cocktailId = parseInt(req.params.id, 10);
    const cocktail = await cocktailDataMapper.getOneCocktail(cocktailId);
    if(cocktail){
        res.render('cocktailInfoPage', {cocktail});
    } else {
        next();
    };
  },

  async addCocktailByUserPage(req, res){
    const result = await cocktailDataMapper.addOneCocktailByUser(req.body);
    if(result===1){
        res.redirect(`/cocktails`);
    } else {
        res.status(500).send('Erreur interne du serveur, aucun cocktail ajouté');
    }
  },

  async addCocktailByAdminPage(req, res){
    const result = await cocktailDataMapper.addOneCocktailByAdmin(req.body);
    if(result===1){
        res.redirect(`/cocktails`);
    } else {
        res.status(500).send('Erreur interne du serveur, aucun cocktail ajouté');
    }
    }
};

module.exports = cocktailsController;