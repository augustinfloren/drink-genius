const client = require('./dbClient');
const debug = require('debug')

const dataMapper = {
    // AFFICHER TOUS LES UTILISATEURS
    async getAllUsers(){
        const result = await client.query(`SELECT * FROM user`);
        return result.rows;
    },

    // CONNECTION
    async getUserByEmail(email){
        const sqlQuery = {
            text: `SELECT * FROM "user" WHERE email=$1`,
            values: [email]
        };
        const result = await client.query(sqlQuery);
        return result.rows[0];
    },

    // AFFICHER LE PROFIL USER
    async getOneUser(id){
        const sqlQuery = {
            text: `SELECT * FROM user WHERE id=$1`,
            values: [id]
        };
        const result = await client.query(sqlQuery);
        return result.rows[0];
    },

    // INSCRIPTION USER
    async addOneUser(user){
        const { lastname, firstname, birthdate, email, password, roleId } = user;
        const sqlQuery = `INSERT INTO "user"(lastname, firstname, birthdate, email, password, role_id) VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [lastname, firstname, birthdate, email, password, roleId];

        let result;
        let error;

        try{
            const response = await client.query(sqlQuery, values);

            result = response.rows;

            console.log(result);

            if(!result) {
                throw new Error("Informations erronnées");
            }
        } catch(error){
            return { error: error.message || "Une erreur inattendue s'est produite." };
        }

        return {error, result};
    },

    // MODIFICATION PROFIL
    async updateUser(user){
        const { location, hobbies, id } = user;
        const sqlQuery = {
            text: `UPDATE "user" SET location =$1, hobbies =$2 WHERE id=$3`,
            values:[location, hobbies, id]
        };
        const result = await client.query(sqlQuery);
        return result.rowCount;
    },

    // DESINSCRIPTION
    async deleteUser(userId){
        const sqlQuery= {
            text:`DELETE FROM "user" WHERE id=$1`,
            values:[userId]
        };
        const result = await client.query(sqlQuery);
        return result.rowCount;
    }

};

module.exports = dataMapper;