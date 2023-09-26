const client = require('./dbClient');

const cocktailDataMapper = {
    // OBTENIR TOUS LES COCKTAILS VALIDES
    async getValidatedCocktails(){
        const result = await client.query(`SELECT * FROM cocktail WHERE validation=true`);
        return result.rows;
    },

    // OBTENIR TOUS LES COCKTAILS EN ATTENTE DE VALIDATION
    async getNotValidatedCocktails(){
        const result = await client.query('SELECT * FROM cocktail WHERE validation=false')
        return result.rows;
        },

    // OBTENIR UN COCKTAIL
    async getOneCocktail(id){
        const sqlQuery = {
            text: 'SELECT * FROM cocktail WHERE id=$1',
            values: [id]
        };
        const result = await client.query(sqlQuery);
        return result.rows[0];
    },

    // AJOUT D'UN COCKTAIL PAR UTILISATEUR
    async addOneCocktailByUser(cocktail){
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
    async addOneCocktailByUser(cocktail){
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