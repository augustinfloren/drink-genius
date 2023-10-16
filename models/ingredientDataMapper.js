const client = require('./dbClient');

const ingredientDataMapper = {
    // OBTENIR DES INGREDIENTS ALEATOIRES
    async getRandomIngredients(){
        try {
            const result = await client.query(`SELECT
            name, unit,
            CEIL(random()*( (max_quantity - min_quantity) + min_quantity)) AS quantity
            FROM ingredient
            ORDER BY name(random())
            LIMIT (3 + random() * (6 - 3))`);
            return result.rows
        } catch(error) {
            return {error: "Erreur s'est produite avec le serveur."}
        }
    },

    // OBTENIR DES INGREDIENTS SANS ALCOOL ALEATOIRES
    async getRandomVirginIngredients(){
        try {
            const result = await client.query(`SELECT name, unit,
            CEIL(random()*( (max_quantity - min_quantity) + min_quantity)) AS quantity
            FROM ingredient
            WHERE ingredient.id NOT IN (
            SELECT ingredient_id
            FROM ingredient_has_label
            WHERE label_id = 1)
            ORDER BY name(random())
            LIMIT (3 + random() * (6 - 3))`);
            return result.rows
        } catch (error) {
            return {error: "Erreur s'est produite avec le serveur."}
        }
    },

    // OBTENIR TOUS LES INGREDIENTS
    async getAllIngredients(){
        try {
            const result = await client.query(`SELECT * FROM ingredient ORDER BY name`);
            return result.rows;
        } catch(error){
            return {error: "Erreur s'est produite avec le serveur."} 
        }
    },

    // OBTENIR LE NOM D'UN INGREDIENT
    async getSpiritsName(){
        try {
            const result = await client.query(`SELECT ingredient.name AS name, ingredient.id FROM ingredient WHERE ingredient.id IN (SELECT ingredient_id FROM ingredient_has_label WHERE label_id = 1)`)
            return result.rows;
        } catch (error) {
            return {error: "Erreur s'est produite avec le serveur."}
        }
    },
};


module.exports = ingredientDataMapper;