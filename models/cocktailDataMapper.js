const client = require('./dbClient');

const cocktailDataMapper = {
    // OBTENIR TOUS LES COCKTAILS VALIDES
    async getValidatedCocktails() {
        const result = await client.query(`SELECT * FROM cocktail WHERE validation=true`);
        return result.rows;
    },

    //OBTENIR LES COCKTAILS AVEC LES INGREDIENTS
    async getCocktailBySpirits(ingredient_ids) {
    const sqlQuery = {
        text: `SELECT DISTINCT ON (cocktail.id) cocktail.*, cocktail_contain_ingredient.ingredient_id
        FROM cocktail
        LEFT JOIN cocktail_contain_ingredient
        ON cocktail.id = cocktail_contain_ingredient.cocktail_id
        WHERE cocktail_contain_ingredient.ingredient_id =ANY($1)`,
        values: [ingredient_ids]
    }
        const result = await client.query(sqlQuery);
        return result.rows;

    },


    // OBTENIR TOUS LES COCKTAILS EN ATTENTE DE VALIDATION
    async getNotValidatedCocktails() {
        const result = await client.query('SELECT * FROM cocktail WHERE validation=false')
        return result.rows;
    },

    // CHANGER LE STATUT D'UN COCKTAIL PAR L'ADMIN
    async updateCocktailStatus(cocktail_id){
        validation = true;
        const sqlQuery = {
            text:'UPDATE cocktail SET validation=$1 WHERE id=$2',
            values: [validation, cocktail_id]
        };
        const result = await client.query(sqlQuery);
        return result;
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
            text: `SELECT cocktail.name, cocktail.instruction, cocktail.picture, cocktail.id,
            CASE
                WHEN COUNT(DISTINCT gaic.quantity) = 0 THEN NULL
                ELSE ARRAY_AGG(DISTINCT
                    jsonb_build_object(
                        'quantity', gaic.quantity,
                        'unit', garnish.unit,
                        'name', garnish.name))
            END AS garnitures,
            ARRAY_AGG(DISTINCT
                jsonb_build_object(
                    'quantity', cci.quantity,
                    'unit', ingredient.unit,
                    'name', ingredient.name)) AS ingredients,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT label.name), NULL) AS labels
        FROM cocktail
        LEFT JOIN cocktail_contain_ingredient AS cci ON cocktail.id = cci.cocktail_id
        LEFT JOIN ingredient ON ingredient.id = cci.ingredient_id
        LEFT JOIN garnish_add_into_cocktail AS gaic ON cocktail.id = gaic.cocktail_id
        LEFT JOIN garnish ON garnish.id = gaic.garnish_id
        LEFT JOIN ingredient_has_label AS labeling ON ingredient.id = labeling.ingredient_id
        LEFT JOIN label ON label.id = labeling.label_id
        WHERE cocktail.id = $1
        GROUP BY cocktail.name, cocktail.instruction, cocktail.picture, cocktail.id`,
            values: [cocktail_id]
        };
        const result = await client.query(sqlQuery);
        return result.rows[0];
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

    // AJOUT D'UN COCKTAIL -- FONCTION
    async addOneCocktailFunction(name, instruction, user_id, ingredientsData){
        const sqlQuery = {
            text : 'SELECT * FROM newcocktail($1, $2, $3, $4)',
            values: [name, instruction, user_id, ingredientsData]
        };
        const result = await client.query(sqlQuery);
        return result;
    },

    // AJOUT D'UN COCKTAIL PAR ADMIN
    async addOneCocktailByAdmin(name, instruction, user_id) {
        const validation = true;
        const sqlQuery = {
            text: 'INSERT INTO cocktail(name, instruction, validation, user_id) VALUES ($1, $2, $3, $4)',
            values: [name, instruction, validation, user_id]
        };
        const result = await client.query(sqlQuery);
        return result.rowCount;
    },

    // SUPPRESSION D'UN COCKTAIL
    async deleteCocktail(cocktailId){
        const sqlQuery = {
            text: 'DELETE FROM cocktail WHERE cocktail.id = $1',
            values: [cocktailId]
        };
        const result = await client.query(sqlQuery);
        return result;
    }
}

module.exports = cocktailDataMapper;