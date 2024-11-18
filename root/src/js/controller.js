import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2
// 71692436-5517-472d-8a28-b915f6a68772

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
// 664c8f193e7aa067e94e89af
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1 Loading res

    await model.loadRecipe(id);

    // rendering

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (err) {
    searchView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controllSearchResults);
};

init();
