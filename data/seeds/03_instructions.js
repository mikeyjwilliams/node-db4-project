exports.seed = async function(knex) {
  await knex('instructions').insert([
    {
      instruction: 'Get 2 pieces of bread and 2 cups of peanut butter out.',
      recipes_id: 1,
    },
    {
      instruction:
        'using a butter knife, spread 1 cup of peanut butter across each slice of bread.',
      recipes_id: 1,
    },
    {
      instruction:
        'Take the 2 slices of bread with peanut butter on them and press them together and serve.',
      recipes_id: 1,
    },
    {
      instruction: 'Take 2 slices of bread out and place them in a toaster.',
      recipes_id: 2,
    },
    {
      instruction:
        'Turn toaster on to desired shading setting and let bread reach desired crispy and shade.',
      recipes_id: 2,
    },
    {
      instruction:
        'with a butter knife, put desired amount of butter on each slice of toast and serve.',
      recipes_id: 2,
    },
  ]);
};
