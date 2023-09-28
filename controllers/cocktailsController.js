const cocktailDataMapper = require("../models/cocktailDataMapper");
const ingredientDataMapper = require("../models/ingredientDataMapper");

const cocktailsController = {
  async getAllCocktailsPage(req, res){
    const cocktails = await cocktailDataMapper.getValidatedCocktails();
    res.render('cocktailsListPage', {cocktails});
  },

  async getCocktailInfoPage(req, res){
    const cocktailId = parseInt(req.params.id, 10);
    const cocktail = await cocktailDataMapper.getOneCocktail(cocktailId);
    const cocktailIngredients = await cocktailDataMapper.getIngredientByCocktail(cocktailId)
    const cocktailGarnishes = await cocktailDataMapper.getGarnishByCocktail(cocktailId);
    
/*     let ingredient_id = []
    cocktailIngredients.forEach(ingredient => {
      ingredient_id.push(ingredient.id);
    });

    console.log(ingredient_id);

    for(const id of ingredient_id){
    const ingredientsLabels = await ingredientDataMapper.getLabelByIngredient(id);
    console.log(ingredientsLabels)
    return ingredientsLabels;
    }; */

    if(cocktail){
        res.render('cocktailPage', {cocktail, cocktailIngredients, cocktailGarnishes});
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