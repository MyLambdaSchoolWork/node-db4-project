
exports.seed = async function(knex) {
  return knex('ingredients').insert([
    { ingredient_name: 'Money' },
    { ingredient_name: 'Eggs' },
  ])
}
