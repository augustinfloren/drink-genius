const client = require('./dbClient');

const ingredientDataMapper = {
    // OBTENIR DES INGREDIENTS ALEATOIRES
    async getRandomIngredients(){
        const result = await client.query(`SELECT
        name, unit,
        CEIL(random()*( (max_quantity - min_quantity) + min_quantity)) AS quantity
        FROM ingredient
        ORDER BY name(random())
        LIMIT (3 + random() * (6 - 3))`);
        return result.rows
        },

    // OBTENIR DES INGREDIENTS SANS ALCOOL ALEATOIRES
    async getRandomVirginIngredients(){
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
    },

    // OBTENIR TOUS LES INGREDIENTS
    async getAllIngredients(){
        const result = await client.query(`SELECT * FROM ingredient ORDER BY name`);
        return result.rows;
    },

    // OBTENIR LE NOM D'UN INGREDIENT
    async getSpiritsName(){
        const result = await client.query(`SELECT ingredient.name AS name, ingredient.id FROM ingredient WHERE ingredient.id IN (SELECT ingredient_id FROM ingredient_has_label WHERE label_id = 1)`)
        return result.rows;
    },
};


module.exports = ingredientDataMapper;