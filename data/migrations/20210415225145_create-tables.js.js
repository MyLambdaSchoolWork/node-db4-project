
exports.up = function(knex) {
  return knex.schema
    .createTable( 'recipes', tbl => {
      tbl.increments('recipe_id')
      tbl.string('recipe_name', 128).unique().notNullable()
      tbl.specificType('created_at', 'CHAR(24) DEFAULT NULL');
    })
    .createTable( 'steps', tbl => {
      tbl.increments('step_id')
      tbl.integer('step_num').notNullable()
      tbl.string('step_instructions', 280).notNullable()
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('RESTRICT')

    })
    .createTable( 'ingredients', tbl => {
      tbl.increments('ingredient_id')
      tbl.string('ingredient_name', 128).notNullable()
    })
    .createTable( 'step_ingredients', tbl => {
      tbl.increments('step_ingredient_id')
      tbl.string('quantity', 128).notNullable()
      tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('RESTRICT')
      tbl.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onDelete('RESTRICT')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
};
