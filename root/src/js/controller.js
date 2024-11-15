import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
// 71692436-5517-472d-8a28-b915f6a68772

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
// 664c8f193e7aa067e94e89af
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
///////////////////////////////////////

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    recipeView.renderSpinner(recipeContainer);
    // 1 Loading res

    await model.loadRecipe(id);

    // rendering

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
};

init();
