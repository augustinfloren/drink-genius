const roles = require('./seedings/seeding_role.json');
const users = require('./seedings/seeding_user.json');
const cocktails = require('./seedings/seeding_cocktail.json');
const labels = require('./seedings/seeding_label.json');
const ingredients = require('./seedings/seeding_ingredient.json');
const cocktailContainIngredient = require('./seedings/seeding_cocktail_contain_ingredient.json');
const client = require('../dataMapper/dbClient');

async function importRoles(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const role of roles){
        sqlParameters.push(`($${counter})`);

        sqlValues.push(role.name)
     
    const sqlQuery = `
    INSERT INTO "role"("name")
    VALUES ${sqlParameters.join()};
`;

await client.query(sqlQuery, sqlValues);
sqlParameters=[];
sqlValues=[];
    };

};

async function importUsers(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const user of users){
        sqlParameters.push(`$${counter}, $${counter +1}, $${counter +2}, $${counter +3}, $${counter +4}, $${counter +5}`);
        sqlValues.push(user.lastname, user.firstname, user.birthdate, user.email, user.password, user.role_id)

        const sqlQuery = `
        INSERT INTO "user"("lastname", "firstname", "birthdate", "email", "password", "role_id")
        VALUES (${sqlParameters.join()});
    `;    
        console.log(sqlQuery);
    
        await client.query(sqlQuery, sqlValues);
        sqlParameters=[];
        sqlValues=[];
    };
};

async function importCocktails(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const cocktail of cocktails){
        sqlParameters.push(`$${counter}, $${counter +1}, $${counter +2}, $${counter +3}, $${counter +4}`);
        sqlValues.push(cocktail.name, cocktail.instruction, cocktail.picture, cocktail.validation, cocktail.user_id)

        const sqlQuery = `
        INSERT INTO "cocktail"("name", "instruction", "picture", "validation", "user_id")
        VALUES (${sqlParameters.join()});
    `;    
        console.log(sqlQuery);
    
        await client.query(sqlQuery, sqlValues);
        sqlParameters=[];
        sqlValues=[];
    };
};

async function importLabels(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const label of labels){
        sqlParameters.push(`$${counter}`);
        sqlValues.push(label.name)

        const sqlQuery = `
        INSERT INTO "label"("name")
        VALUES (${sqlParameters.join()});
    `;    
        console.log(sqlQuery);
    
        await client.query(sqlQuery, sqlValues);
        sqlParameters=[];
        sqlValues=[];
    };
};

async function importIngredients(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const ingredient of ingredients){
        sqlParameters.push(`$${counter}, $${counter +1}, $${counter +2}, $${counter +3}`);
        sqlValues.push(ingredient.name, ingredient.unit, ingredient.min_quantity, ingredient.max_quantity)

        const sqlQuery = `
        INSERT INTO "ingredient"("name", "unit", "min_quantity", "max_quantity")
        VALUES (${sqlParameters.join()});
    `;    
        console.log(sqlQuery);
    
        await client.query(sqlQuery, sqlValues);
        sqlParameters=[];
        sqlValues=[];
    };
};

async function importCocktailContainIngredient(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const relation of cocktailContainIngredient){
        sqlParameters.push(`$${counter}, $${counter +1}, $${counter +2}`);
        sqlValues.push(relation.cocktail_id, relation.ingredient_id, relation.quantity)
        
        const sqlQuery = `
        INSERT INTO "cocktail_contain_ingredient"("cocktail_id", "ingredient_id", "quantity")
        VALUES (${sqlParameters.join()});
    `;    
        console.log(sqlQuery);
    
        await client.query(sqlQuery, sqlValues);
        sqlParameters=[];
        sqlValues=[];
    }

}


importRoles();
importUsers();
importCocktails();
importLabels();
importIngredients();
importCocktailContainIngredient();