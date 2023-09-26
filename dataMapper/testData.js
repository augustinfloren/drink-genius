const dataMapper = require("./dataMapper");

async function test () {
    const cocktails = await dataMapper.getAllCocktails();
    console.log(cocktails);
};

test();