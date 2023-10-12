const client = require('./dbClient');

const dataMapper = {
    // AFFICHER TOUS LES UTILISATEURS NON-ADMIN
    async getAllUsers(){
        const result = await client.query(`SELECT * FROM "user" WHERE role_id=2`);
        return result.rows;
    },

    // CONNEXION

    async getUserByEmail(email){

        let result;
        let error;

        const sqlQuery = {
            text: `SELECT * FROM "user" WHERE email=$1`,
            values: [email]
        };

        try {
            const response = await client.query(sqlQuery);
            result = response.rows[0];
            if (!result) {
                return { error: "Utilisateur non trouvé.", code: "USER_NOT_FOUND", result: null };
            }
        } catch(err) {
            return { error: "Une erreur s'est produite de l'authentification.", code: "DATABASE_ERROR", result: null };
        }

        return {error, result};
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
        const insertQuery = {
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
                return { error: "Cet email est déjà enregistré.", code: "DUPLICATE_EMAIL", result: null };
            } else {
                const response = await client.query(insertQuery);
                result = response.rows;
            }

            } catch(err){
                return { error: "Une erreur s'est produite lors de l'ajout de l'utilisateur.", code: "DATABASE_ERROR", result: null };
            }

            return {error, result};
    },

    // MODIFICATION PROFIL
    async updateUser(userInfo, id){
        const { firstname, lastname, birthdate, email, location, hobbies } = userInfo;
        const sqlQuery = {
            text: `UPDATE "user" SET firstname = $1, lastname = $2, birthdate = $3, email = $4, location =$5, hobbies =$6 WHERE id=$7 RETURNING id, lastname, firstname, birthdate, location, email, hobbies, role_id`,
            values:[firstname, lastname, birthdate, email, location, hobbies, id]
        };
        const result = await client.query(sqlQuery);
        return result.rows[0];
    },

    // DESINSCRIPTION
    async deleteUser(userId){
        const sqlQuery= {
            text:`DELETE FROM "user" WHERE id=$1`,
            values:[userId]
        };
        const result = await client.query(sqlQuery);

        return result.rowCount;
    },

    // RECUPERER LES COCKTAILS FAVORIS PAR UTILISATEUR
    async getFavourites(user_id){
        const sqlQuery = {
            text: `SELECT * FROM cocktail
            JOIN user_like_cocktail AS favourites ON cocktail.id = favourites.cocktail_id
            WHERE favourites.user_id =$1`,
            values: [user_id]
        };
        const result = await client.query(sqlQuery);
        return result.rows;
    },

    // RECUPERER LES COCKTAILS PAR UTILISATEUR
    async getUserCocktails(user_id){
        const sqlQuery = {
            text: 'SELECT * FROM cocktail WHERE user_id=$1',
            values: [user_id]
        };
        const result = await client.query(sqlQuery)
        return result.rows;
    },

  // AJOUTER UN COCKTAIL AUX FAVORIS DE L'UTILISATEUR
  async addToFavourites(user_id, cocktail_id) {
    const sqlQuery = {
      text: "INSERT INTO user_like_cocktail(user_id, cocktail_id) VALUES ($1, $2) RETURNING *",
      values: [user_id, cocktail_id],
    };
    const result = await client.query(sqlQuery);
    return result;
  },
};

module.exports = dataMapper;