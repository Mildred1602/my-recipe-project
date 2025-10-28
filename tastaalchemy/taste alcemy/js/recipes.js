const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');
// ✅ Your Spoonacular API key
const API_KEY = "e91d65e921234c638b874a970301d17a";

// 🔍 Search Recipes
async function searchRecipes() {
  const query = searchInput.value.trim();
  if (!query) {
    recipeContainer.innerHTML = '<p class="text-center text-muted">Please enter a search term.</p>';
    return;
  }

  recipeContainer.innerHTML = '<p class="text-center text-info">Loading recipes...</p>';

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      displayRecipes(data.results);
    } else {
      recipeContainer.innerHTML = '<p class="text-center text-danger">No recipes found.</p>';
    }
  } catch (err) {
    console.error(err);
    recipeContainer.innerHTML = '<p class="text-center text-danger">Error fetching recipes.</p>';
  }
}

// 🍽 Display Recipe Cards
function displayRecipes(meals) {
  recipeContainer.innerHTML = '';
  meals.forEach(meal => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4">
        <img src="${meal.image}" class="card-img-top" alt="${meal.title}">
        <div class="card-body">
          <h5 class="fw-bold">${meal.title}</h5>
          <p class="small text-muted">${meal.readyInMinutes} mins • ${meal.servings} servings</p>
          <button class="btn btn-cta btn-sm rounded-pill" onclick="viewRecipe(${meal.id})">View Recipe</button>
        </div>
      </div>
    `;
    recipeContainer.appendChild(col);
  });
}

// 📖 View Recipe Details
async function viewRecipe(id) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const meal = await res.json();

    const ingredients = meal.extendedIngredients
      .map(i => `<li class="list-group-item">${i.original}</li>`)
      .join('');

    recipeContainer.innerHTML = `
      <div class="col-12">
        <button class="btn btn-secondary mb-4 rounded-pill" onclick="searchRecipes()">← Back to Results</button>
        <div class="card border-0 shadow-lg p-4 rounded-4">
          <h3 class="fw-bold mb-3">${meal.title}</h3>
          <img src="${meal.image}" class="img-fluid rounded mb-4" alt="${meal.title}">
          <h5>Ingredients</h5>
          <ul class="list-group list-group-flush mb-3">
            ${ingredients}
          </ul>
          <h5>Instructions</h5>
          <p>${meal.instructions || "No instructions available."}</p>
          ${
            meal.sourceUrl
              ? `<a href="${meal.sourceUrl}" target="_blank" class="btn btn-danger rounded-pill mt-3">View Full Recipe</a>`
              : ''
          }
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    recipeContainer.innerHTML = '<p class="text-center text-danger">Error loading recipe details.</p>';
  }
}