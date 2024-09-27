
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
  let recipeTable;
  try {
    recipeTable = await db('recipes as r')
      .join('steps as st', 'st.recipe_id', 'r.recipe_id')
      .leftJoin('step_ingredients as st_i', 'st.step_id', 'st_i.step_id')
      .leftJoin('ingredients as i', 'i.ingredient_id', 'st_i.ingredient_id')
      .select('r.*', 'st.step_num', 'st.step_instructions as instructions', 'i.ingredient_name', 'st_i.quantity')
      .where('r.recipe_id', id)
      .orderBy('st.step_num')
  } catch(err) {
    console.log(err, err.message)
    return
  }

  // console.log(recipeTable)

  const recipeJson = {
    id,
    recipe_name: recipeTable[0].recipe_name,
    steps: []
  }

  const steps = []
  let lastStep = 0
  recipeTable.forEach( (part, i) => {
    const stepNum = part.step_num
    if(lastStep === stepNum){
      return
    } else {
      lastStep = stepNum
    }
    const newStep = {
      step_num: stepNum,
      instructions: part.instructions
    }

    if(part.ingredient_name){
      const ingredients = []
      for(let j = i; (j < recipeTable.length && recipeTable[j].step_num === stepNum); j++){
        ingredients.push({
          ingredient_name: recipeTable[j].ingredient_name,
          quantity: recipeTable[j].quantity
        })
      }
      steps.push({
        ...newStep,
        ingredients
      })
      // return {
      //   ...newStep,
      //   ingredients
      // }
    } else {
      steps.push({...newStep})
      // return newStep
    }    
  })

  recipeJson.steps = steps
  return recipeJson
}

getRecipeById(2)
  .then( res => {
    console.log(res)
    console.log(res.steps[0].ingredients)
    console.log('\n')
  })
  .catch( err => {
    console.log(err, err.message)
  })


getRecipeById(1)
  .then( res => {
    console.log(res)
    console.log(res.steps[2].ingredients)
  })
  .catch( err => {
    console.log(err, err.message)
  })
