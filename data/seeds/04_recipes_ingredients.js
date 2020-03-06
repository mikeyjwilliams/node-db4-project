exports.seed = async function(knex) {
  await knex('recipes_ingredients').insert([
    { recipes_id: 1, ingredients_id: 1, quantity: 2 },
    { recipes_id: 1, ingredients_id: 2, quantity: 2 },
    { recipes_id: 2, ingredients_id: 1, quantity: 2 },
    { recipes_id: 2, ingredients_id: 3, quantity: 0.75 },
  ]);
};
