exports.seed = async function(knex) {
  await knex('ingredients').insert([
    { ingredient_name: 'bread' },
    { ingredient_name: 'peanut butter' },
    { ingredient_name: 'butter' },
  ]);
};
