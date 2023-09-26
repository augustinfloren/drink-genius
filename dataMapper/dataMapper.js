const client = require('./dbClient');

const dataMapper = {
    // GET ALL
    async getAllCocktails(){
        const result = await client.query(`SELECT * FROM cocktail`);
        return result.rows;
    },

    async getAllUsers(){
        const result = await client.query(`SELECT * FROM user`);
        return result.rows;
    },

    async getAllIngredients(){
        const result = await client.query(`SELECT * FROM ingredient`);
        return result.rows;
    },

    // FILTRES
/*     async getIngredientByLabel(label_id){
        const result = await client.query(`SELECT ingredient.name FROM ingredient WHERE`)
    }, */

    async getOneCocktail(id){
        const result = await client.query(`SELECT * FROM cocktail WHERE id=${id}`);
        return result.rows[0];
    },

    async getOneUser(id){
        const result = await client.query(`SELECT * FROM user WHERE id=${id}`);
        return result.rows[0];
    },

    async getOneIngredient(id){
        const result =  await client.query(`SELECT * FROM ingredient WHERE ID=${id}`);
        return result.rows[0];
    }
};

module.exports = dataMapper;