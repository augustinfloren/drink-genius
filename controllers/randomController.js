const ingredientDataMapper = require('../models/ingredientDataMapper')

const randomController = {
    async getRandomIngredients(req, res){
        const randomIngredients = await ingredientDataMapper.getRandomIngredients();
        res.render('homePage', { randomIngredients })    
    },
};

module.exports = randomController;