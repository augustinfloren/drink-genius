const client = require('./dbClient');

const ingredientDataMapper = {
    async getRandomIngredients(){
        const result = await client.query(`SELECT
        name, unit,
        CEIL(random()*( (max_quantity - min_quantity) + min_quantity)) AS quantity
        FROM ingredient 
        ORDER BY name(random())
        LIMIT (3 + random() * (6 - 3))`);
        return result.rows
        },

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

    async getAllIngredients(){
        const result = await client.query(`SELECT name FROM ingredient`);
        return result.rows;
    },
    
    async getOneIngredient(id){
        const sqlQuery = {
            text: 'SELECT * FROM ingredient WHERE id=$1',
            values: [id]
        }
        const result =  await client.query(sqlQuery);
        return result.rows[0];
    },

    async addIngredient(ingredient){
        const { name, unit, min_quantity, max_quantity } = ingredient;
        const sqlQuery = {
            text: 'INSERT INTO ingredient(name, unit, min_quantity, max_quantity) VALUES ($1, $2, $3, $4)',
            values: [name, unit, min_quantity, max_quantity]
        }
        const result = await client.query(sqlQuery);
        return result.rowCount;
    },

    async addIngredientToCocktail(relation){
        const { cocktail_id, ingredient_id, quantity } = relation;
        const sqlQuery = {
            text: 'INSERT INTO cocktail_contain_ingredient(cocktail_id, ingredient_id, quantity) VALUES ($1, $2, $3)',
            values: [cocktail_id, ingredient_id, quantity]
        }
        const result = await client.query(sqlQuery);
        return result.rowCount;
    },
<<<<<<< HEAD
    
    async getSpiritsName(){
        const result = await client.query(`SELECT ingredient.name AS name, ingredient.id FROM ingredient WHERE ingredient.id IN (SELECT ingredient_id FROM ingredient_has_label WHERE label_id = 1)`)
=======

    // RECUPERER TOUS LES INGREDIENTS NON ALCOOLISES
    async getVirginIngredients(){
        const result = await client.query(`SELECT ingredient.name AS ingredient, label.name AS label FROM ingredient
        JOIN ingredient_has_label AS labeling ON labeling.ingredient_id = id
        JOIN label ON labeling.label_id = label.id
        WHERE labeling.label_id<>1`)
        return result.rows;
    },

    // RECUPERER LES INGREDIENTS SELON LEUR LABEL
    async getIngredientByLabel(){
        const result = await client.query(`SELECT ingredient.name AS ingredient, label.name AS label FROM ingredient
        JOIN ingredient_has_label AS labeling ON labeling.ingredient_id = id
        JOIN label ON labeling.label_id = label.id
        WHERE labeling.label_id=1`)
>>>>>>> d68411c99594e2f095f79ff1d2e1e07e54830d48
        return result.rows;
    },
    
    // RECUPERER LES LABELS PAR INGREDIENT
    async getLabelByIngredient(ingredient_id){
        const sqlQuery = {
            text: `SELECT label.name FROM label
            JOIN ingredient_has_label AS labeling ON labeling.label_id = label.id
            WHERE labeling.ingredient_id=$1`,
            values:[ingredient_id]
        };
        const result = await client.query(sqlQuery)
        return result.rows;
    }
};
//console.log("alors c'est quoi:",)

module.exports = ingredientDataMapper;