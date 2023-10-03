const client = require('./dbClient');

const dataMapper = {
    // AFFICHER TOUS LES UTILISATEURS
    async getAllUsers(){
        const result = await client.query(`SELECT * FROM user`);
        return result.rows;
    },

    // CONNEXION
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
        // Récupère données du formulaire
        const { lastname, firstname, birthdate, email, password, roleId } = user;
        const sqlQuery = {
            text: `INSERT INTO "user"(lastname, firstname, birthdate, email, password, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [lastname, firstname, birthdate, email, password, roleId]
        }

        let result;
        let error;

        try{
            const checkEmailQuery = {
                text: 'SELECT * FROM "user" WHERE email = $1',
                values: [email],
            };

            // Cherche si l'email existe déjà
            const emailCheckResult = await client.query(checkEmailQuery);
            const emailExists = emailCheckResult.rows[0];

            if (emailExists) {
                return { error: "Cet e-mail est déjà enregistré.", code: "DUPLICATE_EMAIL", result: null };
            } else {
                const response = await client.query(sqlQuery);
                result = response.rows;
            }

            } catch(err){
                if (err.code === '23505') { // Violation de contrainte unique (e-mail déjà utilisé)
                    return { error: "Cet e-mail est déjà enregistré.", code: "DUPLICATE_EMAIL", result: null };
                } else {
                    return { error: "Une erreur s'est produite lors de l'ajout de l'utilisateur.", code: "DATABASE_ERROR", result: null };
                }

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