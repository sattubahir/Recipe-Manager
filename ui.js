// ui.js - UI Rendering & DOM Manipulation

const RecipeUI = (() => {
  // Render stats cards
  // In ui.js - Update the renderStats function

const renderStats = () => {
  const stats = RecipeStorage.getStats();
  const container = document.getElementById('statsCards');
  
  container.innerHTML = `
    <div class="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">📊</div>
        <div>
          <div class="text-gray-500 text-xs">Total Recipes</div>
          <div class="text-xl font-bold">${stats.total}</div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">✅</div>
        <div>
          <div class="text-gray-500 text-xs">Easy Recipes</div>
          <div class="text-xl font-bold">${stats.Easy}</div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">⚡</div>
        <div>
          <div class="text-gray-500 text-xs">Quick Meals</div>
          <div class="text-xl font-bold">${stats.Medium}</div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">🔥</div>
        <div>
          <div class="text-gray-500 text-xs">Recent Additions</div>
          <div class="text-xl font-bold">${stats.recent.length}</div>
        </div>
      </div>
    </div>
  `;
};
// Render recipe cards
const renderRecipes = (recipes) => {
  const container = document.getElementById('recipeList');
  
  if (recipes.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">No recipes found</div>';
    return;
  }

  container.innerHTML = recipes.map(recipe => `
    <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
      <div class="cursor-pointer" onclick="AppController.openRecipeDetail(${recipe.id})">
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">${recipe.title}</h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">${recipe.description}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <div class="flex items-center gap-2">
              <span>⏱️ ${recipe.totalTime} min</span>
            </div>
            <span class="px-2 py-1 rounded ${getDifficultyColor(recipe.difficulty)}">${recipe.difficulty}</span>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex border-t border-gray-200">
        <button 
          onclick="event.stopPropagation(); AppController.editRecipe(${recipe.id})" 
          class="flex-1 flex items-center justify-center gap-2 py-3 text-blue-600 hover:bg-blue-50 transition font-medium text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit</span>
        </button>
        <button 
          onclick="event.stopPropagation(); AppController.deleteRecipe(${recipe.id})" 
          class="flex-1 flex items-center justify-center gap-2 py-3 text-red-600 hover:bg-red-50 transition font-medium text-sm border-l border-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  `).join('');
};


  // Render all recipes in the All Recipes view
  const renderAllRecipes = (recipes) => {
    const container = document.getElementById('allRecipesList');
    
    if (!container) return; // Safety check
    
    if (recipes.length === 0) {
      container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">No recipes found</div>';
      return;
    }

    container.innerHTML = recipes.map(recipe => `
      <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition cursor-pointer" onclick="AppController.openRecipeDetail(${recipe.id})">
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">${recipe.title}</h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">${recipe.description}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <div class="flex items-center gap-2">
              <span>⏱️ ${recipe.totalTime} min</span>
            </div>
            <span class="px-2 py-1 rounded ${getDifficultyColor(recipe.difficulty)}">${recipe.difficulty}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  // Show recipe detail modal
  const showRecipeDetail = (recipe) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.id = 'recipeModal';
    
    modal.innerHTML = `
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <h2 class="text-2xl font-bold">${recipe.title}</h2>
          <button onclick="document.getElementById('recipeModal')?.remove()" class="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div class="p-6">
          <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-64 object-cover rounded mb-4">
          <p class="text-gray-700 mb-4">${recipe.description}</p>
          
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-50 p-3 rounded">
              <div class="text-sm text-gray-600">Prep Time</div>
              <div class="font-bold">${recipe.prepTime} min</div>
            </div>
            <div class="bg-green-50 p-3 rounded">
              <div class="text-sm text-gray-600">Cook Time</div>
              <div class="font-bold">${recipe.cookTime} min</div>
            </div>
            <div class="bg-orange-50 p-3 rounded">
              <div class="text-sm text-gray-600">Total</div>
              <div class="font-bold">${recipe.totalTime} min</div>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">Ingredients</h3>
            <ul class="list-disc list-inside space-y-1">
              ${recipe.ingredients.map(ing => `<li class="text-gray-700">${ing}</li>`).join('')}
            </ul>
          </div>

          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">Steps</h3>
            <ol class="list-decimal list-inside space-y-2">
              ${recipe.steps.map(step => `<li class="text-gray-700">${step}</li>`).join('')}
            </ol>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button onclick="AppController.editRecipe(${recipe.id})" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Edit</button>
            <button onclick="AppController.deleteRecipe(${recipe.id})" class="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Delete</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  };

  // Show add/edit form modal (kept for backward compatibility, but not used with page-based navigation)
  const showRecipeForm = (recipe = null) => {
    const isEdit = !!recipe;
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.id = 'formModal';
    
    modal.innerHTML = `
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <h2 class="text-2xl font-bold">${isEdit ? 'Edit Recipe' : 'Add New Recipe'}</h2>
          <button onclick="document.getElementById('formModal')?.remove()" class="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onsubmit="AppController.saveRecipe(event, ${recipe?.id || 'null'})" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Recipe Title *</label>
            <input type="text" name="title" value="${recipe?.title || ''}" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description *</label>
            <textarea name="description" rows="2" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">${recipe?.description || ''}</textarea>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Prep Time (min) *</label>
              <input type="number" name="prepTime" value="${recipe?.prepTime || ''}" required min="1" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Cook Time (min) *</label>
              <input type="number" name="cookTime" value="${recipe?.cookTime || ''}" required min="1" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Total Time (min) *</label>
              <input type="number" name="totalTime" value="${recipe?.totalTime || ''}" required min="1" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Ingredients (one per line) *</label>
            <textarea name="ingredients" rows="3" required placeholder="Tomato&#10;Onion&#10;Garlic" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">${recipe?.ingredients?.join('\n') || ''}</textarea>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Steps (one per line) *</label>
            <textarea name="steps" rows="3" required placeholder="Heat oil&#10;Add spices&#10;Cook" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">${recipe?.steps?.join('\n') || ''}</textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Difficulty *</label>
              <select name="difficulty" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select</option>
                <option value="Easy" ${recipe?.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
                <option value="Medium" ${recipe?.difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Hard" ${recipe?.difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Image URL</label>
              <input type="url" name="imageUrl" value="${recipe?.imageUrl || ''}" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="submit" class="flex-1 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Save</button>
            <button type="button" onclick="document.getElementById('formModal')?.remove()" class="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  };

  // Show error message
  const showError = (message) => {
    const error = document.createElement('div');
    error.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50 max-w-sm';
    error.textContent = message;
    document.body.appendChild(error);
    setTimeout(() => error.remove(), 4000);
  };

  // Show success message
  const showSuccess = (message) => {
    const success = document.createElement('div');
    success.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 max-w-sm';
    success.textContent = message;
    document.body.appendChild(success);
    setTimeout(() => success.remove(), 3000);
  };

  // Update filter button active state
  const updateFilterButtons = (activeFilter) => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.difficulty === activeFilter) {
        btn.classList.add('bg-teal-600', 'text-white');
        btn.classList.remove('bg-gray-300', 'text-gray-800');
      } else {
        btn.classList.remove('bg-teal-600', 'text-white');
        btn.classList.add('bg-gray-300', 'text-gray-800');
      }
    });
  };

  return {
    renderStats,
    renderRecipes,
    renderAllRecipes, 
    showRecipeDetail,
    showRecipeForm,
    showError,
    showSuccess,
    updateFilterButtons,
    getDifficultyColor
  };
})();
