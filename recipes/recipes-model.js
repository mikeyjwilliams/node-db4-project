const db = require('../data/config');

module.exports = {
	getRecipes,
	postRecipe,
	getShoppingList,
	getInstructions,
	findById,
	postIngredientRecipe,
	findByIdIngred
};

function findById(id) {
	return db('recipes')
		.where({ id: id })
		.first()
		.select();
}

function getRecipes() {
	return db('recipes').select('name as recipe_name');
}

async function postRecipe(recipe) {
	const [id] = await db('recipes').insert(recipe);
	const recipe = await findById(id);
	return recipe;
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

function findByIdIngred(id) {
	return db('ingredients')
		.where({ id: id })
		.first()
		.select();
}

async function postIngredientRecipe(recipes_id, ingredient, quantity) {
	//    const ingredients_id = await db('ingredients')
	//       .where('ingredient_name', ingredient)
	//       .select('ingredients_id')
	//       .first();
	const [ingredients_id] = await db('ingredients').insert(ingredient);

	const ids = {
		recipes_id: recipes_id,
		ingredients_id: ingredients_id,
		quantity: quantity
	};
	const [id] = await db('recipes_ingredients').insert(ids);

	return db('recipes_ingredients as ri')
		.select(
			'r.name as recipe_name',
			'i.ingredient_name as ingredient_name',
			'ri.quantity as quantity'
		)
		.join('recipes as r', 'ri.recipes_id', 'r.id')
		.join('ingredients as i', 'ri.ingredients_id', 'i.id')
		.where({ 'i.id': ingredients_id, 'ri.recipes_id': recipes_id })
		.first();
}
