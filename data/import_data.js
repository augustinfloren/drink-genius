const roles = require('./seedings/seeding_role.json');
const users = require('./seedings/seeding_user.json');
const client = require('../dataMapper/dbClient');

async function importRoles(){
    let counter = 1;
    const sqlValues = [];
    const sqlParameters = [];

    for(const role of roles){
        sqlParameters.push(`($${counter})`);

        sqlValues.push(role.name)
        counter +=1;
    };
    const sqlQuery = `
    INSERT INTO "role"("name")
    VALUES ${sqlParameters.join()};
    `;

    await client.query(sqlQuery, sqlValues);
};

async function importUsers(){
    let counter = 1;
    const sqlValues = [];
    const sqlParameters = [];

    for(const user of users){
        sqlParameters.push(`($${counter}, $${counter +1}), $${counter +1}, $${counter +1}), $${counter +1}, $${counter +1})`);

        sqlValues.push(role.name)
        counter +=1;
    };
    const sqlQuery = `
    INSERT INTO "role"("name")
    VALUES ${sqlParameters.join()};
    `;

    await client.query(sqlQuery, sqlValues);
}


importRoles();