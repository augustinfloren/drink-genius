const ingredientDataMapper = require('../models/ingredientDataMapper')

const mainController = {
  async getHomePage (req,res){
    const message = req.session.errorMessage
    const randomIngredients = await ingredientDataMapper.getRandomIngredients();
    res.render('homePage', {message, randomIngredients});
  }
};

module.exports = mainController;