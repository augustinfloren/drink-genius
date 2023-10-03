const ingredientDataMapper = require('../models/ingredientDataMapper')

const randomController = {
    async getRandomIngredients(req, res){
        const randomIngredients = await ingredientDataMapper.getRandomIngredients();
        res.json(randomIngredients); 
    },
};

module.exports = randomController;