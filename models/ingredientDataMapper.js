const client = require('./dbClient');

const ingredientDataMapper = {
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

    async getIngredientByLabel(label_id){
        const sqlQuery = {
            text: `SELECT ingredient.name AS ingredient, label.name AS category FROM ingredient
            JOIN ingredient_has_label AS labeling ON labeling.ingredient_id = id
            JOIN label ON labeling.label_id = label.id
            WHERE labeling.label_id=$1`,
            values: [label_id]
        };

        const result = await client.query(sqlQuery)
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

module.exports = ingredientDataMapper;