const cocktailDataMapper = require("../models/cocktailDataMapper");
const ingredientDataMapper = require("../models/ingredientDataMapper");

const cocktailsController = {
  async getAllCocktailsPage(req, res){
    const cocktails = await cocktailDataMapper.getValidatedCocktails();
    const spirits = await ingredientDataMapper.getSpiritsName();
    let currentRoute = 'cocktails';
    res.render('cocktailsListPage', {cocktails, spirits, currentRoute});

  },
  async getCocktailsBySpirits(req, res) {
    const spirits_id = (req.body.spirits);
    const cocktailsBySpirit = await cocktailDataMapper.getCocktailBySpirits(spirits_id);
    res.json(cocktailsBySpirit);
},


  async getCocktailInfoPage(req, res){
    const cocktailId = parseInt(req.params.id, 10);
    const cocktailInfo = await cocktailDataMapper.getCocktailInformation(cocktailId);
    let currentRoute = "cocktail";
    if(cocktailInfo){
        res.render('cocktailPage', { cocktailInfo, currentRoute });
    } else {
      res.status(500).json("cocktail introuvable");
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
