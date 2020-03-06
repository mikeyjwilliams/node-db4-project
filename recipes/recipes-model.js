const db = require('../data/config');

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions,
};

function getRecipes() {
  return db('recipes').select('name as recipe_name');
}

function getShoppingList(recipe_id) {
  return db('recipes_ingredients as ri')
    .select('i.ingredient_name as ingredient', 'ri.quantity as quantity')
    .join('ingredients as i', 'ri.ingredients_id', 'i.id')
    .where('ri.recipes_id', recipe_id);
}

function getInstructions(recipe_id) {
  return db('instructions as i')
    .select('i.instruction as instruction')
    .join('recipes as r', 'r.id', 'i.recipes_id')
    .where('r.id', recipe_id)
    .orderBy('i.id', 'asc');
}
