
exports.seed = async function(knex) {
  return knex('recipes').insert([
    { recipe_name: 'Pancakes' },
    { recipe_name: 'Burnt eggs' },
  ])
}
