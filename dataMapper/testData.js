const dataMapper = require("./dataMapper");
const cocktailDataMapper = require('./cocktailDataMapper')

async function test () {
    const cocktails = await cocktailDataMapper.getValidatedCocktails();
    console.log(cocktails);
};

async function test2 (){
    const spirits = await dataMapper.getIngredientByLabel(1)
    console.log(spirits)
};

async function test3 (){
    const pina = await cocktailDataMapper.getOneCocktail(2);
    console.log(pina);
};

async function test4 () {
    const unvalidated = await cocktailDataMapper.getNotValidatedCocktails();
    console.log(unvalidated);
};

async function test5() {
    const grog = {name:"grog", instruction:"tout mélanger", picture:"grog.png", user_id:1 }
    const newCocktail = await cocktailDataMapper.addOneCocktailByUser(grog);
    console.log(newCocktail)
};

async function test6(){
    const coffee = {name: "coffee",unit: "cl", min_quantity:1, max_quantity:12}
    const newIngredient = await dataMapper.addIngredient(coffee);
    console.log(newIngredient);
}

async function test7(){
    const ingrCock = {cocktail_id: 5, ingredient_id: 15, quantity: 10};
    const newRelation = await dataMapper.addIngredientToCocktail(ingrCock);
    console.log(newRelation);
}

/* test(); */
/* test2(); */
/* test3(); */
/* test4(); */
/* test5(); */
/* test6(); */
test7();
