const client = require('./dbClient');

// POST, GET, DELETE, PATCH

const dataMapper = {
    // GET ALL
    async getAllUsers(){
        const result = await client.query(`SELECT * FROM user`);
        return result.rows;
    },

    async getOneUser(id){
        const result = await client.query(`SELECT * FROM user WHERE id=${id}`);
        return result.rows[0];
    },


};

module.exports = dataMapper;