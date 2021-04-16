
exports.seed = async function(knex) {
  return knex('step_ingredients').insert([
    { ingredient_id: 1, quantity: '500 dollars', step_id: 3 },
    { ingredient_id: 2, quantity: '283 eggs', step_id: 4 },
    { ingredient_id: 2, quantity: 'Another 283 eggs', step_id: 4 },
  ])
}
