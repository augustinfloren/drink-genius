const cocktailDataMapper = require("../models/cocktailDataMapper");
const ingredientDataMapper = require("../models/ingredientDataMapper");

const cocktailsController = {
  // AFFICHE LA PAGE DE TOUS LES COCKTAILS
  async renderAllCocktailsPage(req, res){
    const cocktails = await cocktailDataMapper.getValidatedCocktails();
    const spirits = await ingredientDataMapper.getSpiritsName();
    let currentRoute = 'cocktails';
    res.render('cocktailsListPage', {cocktails, spirits, currentRoute});
  },

  // FILTRE LES COCKTAILS SELON L'ALCOOL
  async filterCocktailsBySpirits(req, res) {
    const spirits_id = (req.body.spirits);
    const cocktailsBySpirit = await cocktailDataMapper.getCocktailBySpirits(spirits_id);
    res.json(cocktailsBySpirit);
},

  // AFFICHE LES INFORMATIONS D'UN COCKTAIL
  async renderCocktailInfoPage(req, res){
    const cocktailId = parseInt(req.params.id, 10);
    const cocktailInfo = await cocktailDataMapper.getCocktailInformation(cocktailId);
    let currentRoute = "cocktail";
    if(cocktailInfo){
        res.render('cocktailPage', { cocktailInfo, currentRoute });
    } else {
      res.status(500).json("cocktail introuvable");
    };
  },

  // AJOUTE UN COCKTAIL
  async addCocktailByUser(req, res){
    const result = await cocktailDataMapper.addOneCocktailByUser(req.body);
    if(result===1){
        res.redirect(`/cocktails`);
    } else {
        res.status(500).send('Erreur interne du serveur, aucun cocktail ajouté');
    }
  }
};

module.exports = cocktailsController;
