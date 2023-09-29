const client = require('./dbClient');

const cocktailDataMapper = {
    // OBTENIR TOUS LES COCKTAILS VALIDES
    async getValidatedCocktails() {
        const result = await client.query(`SELECT * FROM cocktail WHERE validation=true`);
        return result.rows;
    },

    // OBTENIR TOUS LES COCKTAILS EN ATTENTE DE VALIDATION
    async getNotValidatedCocktails() {
        const result = await client.query('SELECT * FROM cocktail WHERE validation=false')
        return result.rows;
    },

    // CHANGER LE STATUT D'UN COCKTAIL PAR L'ADMIN
    async updateCocktailStatus(validation, cocktail_id){
        const sqlQuery = {
            text:'UPDATE cocktail SET validation=$1 WHERE id=$2',
            values: [validation, cocktail_id]
        };
        const result = await client.query(sqlQuery);
        return result.rowCount;
        },

    // OBTENIR UN COCKTAIL
    async getOneCocktail(id) {
        const sqlQuery = {
            text: 'SELECT * FROM cocktail WHERE id=$1',
            values: [id]
        };
        const result = await client.query(sqlQuery);
        return result.rows[0];
    },
 
    // OBTENIR TOUTES LES INFORMATIONS D'UN COCKTAIL
    async getCocktailInformation(cocktail_id){
        const sqlQuery = {
            text: `SELECT ARRAY_AGG(DISTINCT gaic.quantity ||' '|| garnish.unit || ' '  || garnish.name) AS garnitures,
            ARRAY_AGG(DISTINCT cci.quantity ||' '|| ingredient.unit ||' '|| ingredient.name) AS ingredients
            FROM cocktail
            JOIN cocktail_contain_ingredient AS cci ON cocktail.id = cci.cocktail_id
            JOIN ingredient ON ingredient.id = cci.ingredient_id
            JOIN garnish_add_into_cocktail AS gaic ON cocktail.id = gaic.cocktail_id
            JOIN garnish ON garnish.id = gaic.garnish_id
            WHERE cocktail.id=$1`,
            values: [id]
        } 
    },

    // OBTENIR LES INGREDIENTS PAR COCKTAIL
    async getIngredientByCocktail(cocktail_id) {
        const sqlQuery = {
            // cci = cocktail_contain_ingredient
            text: `SELECT ingredient.name, ingredient.unit, ingredient.id, cci.quantity FROM ingredient
            JOIN cocktail_contain_ingredient AS cci ON ingredient.id = cci.ingredient_id
            WHERE cci.cocktail_id=$1`,
            values: [cocktail_id]
        };
        const result = await client.query(sqlQuery);
        return result.rows;
    },

    // OBTENIR LES GARNITURES PAR COCKTAIL
    async getGarnishByCocktail(cocktail_id) {
        const sqlQuery = {
            // gaic = garnish_add_into_cocktail
            text: `SELECT garnish.name, garnish.unit, gaic.quantity FROM garnish
                JOIN garnish_add_into_cocktail AS gaic ON garnish.id = gaic.garnish_id
                WHERE gaic.cocktail_id=$1`,
            values: [cocktail_id]
        };
        const result = await client.query(sqlQuery);
        return result.rows;
    },

    // AJOUT D'UN COCKTAIL PAR UTILISATEUR
    async addOneCocktailByUser(cocktail) {
        const { name, instruction, user_id } = cocktail;
        const validation = false;
        const sqlQuery = {
            text: 'INSERT INTO cocktail(name, instruction, validation, user_id) VALUES ($1, $2, $3, $4)',
            values: [name, instruction, validation, user_id]
        };
        const result = await client.query(sqlQuery);
        return result.rowCount;
    },

    // AJOUT D'UN COCKTAIL PAR ADMIN
    async addOneCocktailByAdmin(cocktail) {
        const { name, instruction, user_id } = cocktail;
        const validation = true;
        const sqlQuery = {
            text: 'INSERT INTO cocktail(name, instruction, validation, user_id) VALUES ($1, $2, $3, $4)',
            values: [name, instruction, validation, user_id]
        };
        const result = await client.query(sqlQuery);
        return result.rowCount;
    }
}

module.exports = cocktailDataMapper;