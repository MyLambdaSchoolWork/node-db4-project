
// SQL query to make in knex
// select 
//     r.recipe_id,
//     r.recipe_name,
//     st.step_num,
//     st.step_instructions as instructions,
//     i.ingredient_name,
//     st_i.quantity
// from recipes as r
// join steps as st on st.recipe_id = r.recipe_id
// left join step_ingredients as st_i on st.step_id = st_i.step_id
// left join ingredients as i on i.ingredient_id = st_i.ingredient_id
// where r.recipe_id = 2
// order by st.step_num

// Second possibility
// select 
//     st.step_num,
//     st.step_instructions as instructions,
//     i.ingredient_name,
//     st_i.quantity
// from steps as st
// left join step_ingredients as st_i on st.step_id = st_i.step_id
// left join ingredients as i on i.ingredient_id = st_i.ingredient_id
// where st.recipe_id = 2
// order by st.step_num

const db = require('../../data/db-config.js')

module.exports = {
  getRecipeById,
}

async function getRecipeById(id){
  const recipeTable = await db('recipies as r')
    .join('steps as st', 'st.recipe_id', 'r.recipe_id')
    .leftJoin('step_ingredients as st_i', 'st.step_id', 'st_i.step_id')
    .leftJoin('ingredients as i', 'i.ingredient_id', 'st_i.ingredient_id')
    .where('r.recipe_id', id)
    .orderBy('st.step_num')

  
}