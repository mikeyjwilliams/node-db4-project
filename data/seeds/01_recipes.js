exports.seed = async function(knex) {
  await knex('recipes').insert([
    { name: 'peanut butter sandwhich' },
    { name: 'buttered toast' },
  ]);
};
