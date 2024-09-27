
exports.seed = async function(knex) {
  return knex('steps').insert([
    { step_num: 1, step_instructions: 'Get in Car', recipe_id: 1 },
    { step_num: 2, step_instructions: 'Go to Ihop', recipe_id: 1 },
    { step_num: 3, step_instructions: 'Buy pancakes', recipe_id: 1 },
    { step_num: 1, step_instructions: 'Crack eggs into pan', recipe_id: 2 },
    { step_num: 2, step_instructions: 'Burn them', recipe_id: 2 },
  ])
}
