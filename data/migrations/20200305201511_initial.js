exports.up = async function(knex) {
  await knex.schema.createTable('recipes', tbl => {
    tbl.increments('id');
    tbl
      .string('name')
      .notNullable()
      .unique();
  });

  await knex.schema.createTable('ingredients', tbl => {
    tbl.increments('id');
    tbl
      .string('ingredient_name')
      .notNullable()
      .unique();
  });

  await knex.schema.createTable('instructions', tbl => {
    tbl.increments('id');
    tbl.text('instruction').notNullable();
    tbl
      .integer('recipes_id')
      .references('id')
      .inTable('recipes');
  });

  await knex.schema.createTable('recipes_ingredients', tbl => {
    tbl
      .integer('recipes_id')
      .references('id')
      .inTable('recipes');
    tbl
      .integer('ingredients_id')
      .references('id')
      .inTable('ingredients');
    tbl.float('quantity').notNullable();
    tbl.primary(['recipes_id', 'ingredients_id']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('recipes_ingredients');
  await knex.schema.dropTableIfExists('instructions');
  await knex.schema.dropTableIfExists('ingredients');
  await knex.schema.dropTableIfExists('recipes');
};
