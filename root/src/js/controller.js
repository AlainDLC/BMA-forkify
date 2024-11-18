import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2
// 71692436-5517-472d-8a28-b915f6a68772

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
// 664c8f193e7aa067e94e89af
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearhResultsPage());

    // 1 Loading res

    await model.loadRecipe(id);

    // rendering

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearhResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    searchView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearhResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerAddBookMark(controlAddBookMark);
  paginationView.addHandlerClick(controlPagination);
};

init();
