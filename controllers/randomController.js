const ingredientDataMapper = require('../models/ingredientDataMapper')

const randomController = {
    async getRandomIngredients(req, res){
        const randomIngredients = await ingredientDataMapper.getRandomIngredients();
        res.json(randomIngredients); 
    },

    async getRandomVirginIngredients(req, res){
        const randomVirginIngredients = await ingredientDataMapper.getRandomVirginIngredients();
        res.json(randomVirginIngredients);
    }
};

module.exports = randomController;