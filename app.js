// app.js - Main Application Controller

const AppController = (() => {
  let currentFilter = 'all';
  let currentSearchQuery = '';
  let editingRecipeId = null;

  // Initialize app
  const init = () => {
    RecipeStorage.init();
    loadAndRender();
    setupEventListeners();
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // Search
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
      searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
      });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.difficulty;
        currentSearchQuery = '';
        if (searchInput) searchInput.value = '';
        loadAndRender();
        RecipeUI.updateFilterButtons(currentFilter);
      });
    });

    // Recipe form submission
    const recipeForm = document.getElementById('recipeForm');
    if (recipeForm) {
      recipeForm.addEventListener('submit', handleFormSubmit);
    }
  };

  // Load and render recipes
  const loadAndRender = () => {
    let recipes = RecipeStorage.getAll();

    if (currentSearchQuery) {
      recipes = RecipeStorage.search(currentSearchQuery);
    }

    if (currentFilter !== 'all') {
      recipes = recipes.filter(r => r.difficulty === currentFilter);
    }

    RecipeUI.renderStats();
    RecipeUI.renderRecipes(recipes);
    RecipeUI.renderAllRecipes(RecipeStorage.getAll());
    RecipeUI.updateFilterButtons(currentFilter);
  };

  // Handle search
  const handleSearch = () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      currentSearchQuery = searchInput.value;
      currentFilter = 'all';
      loadAndRender();
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    // Get and clean ingredients and steps
    const ingredients = formData.get('ingredients')
      .split('\n')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);
    
    const steps = formData.get('steps')
      .split('\n')
      .map(step => step.trim())
      .filter(step => step.length > 0);

    const newRecipe = {
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      ingredients: ingredients,
      steps: steps,
      prepTime: parseInt(formData.get('prepTime')),
      cookTime: parseInt(formData.get('cookTime')),
      totalTime: parseInt(formData.get('totalTime')),
      difficulty: formData.get('difficulty'),
      imageUrl: formData.get('imageUrl').trim() || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'
    };

    try {
      if (editingRecipeId) {
        RecipeStorage.update(editingRecipeId, newRecipe);
        RecipeUI.showSuccess('Recipe updated successfully!');
        editingRecipeId = null;
        window.isEditingRecipe = false;
      } else {
        RecipeStorage.add(newRecipe);
        RecipeUI.showSuccess('Recipe added successfully!');
      }
      
      // Reset form
      e.target.reset();
      document.getElementById('formTitle').textContent = 'Add New Recipe';
      
      // Reload recipes
      loadAndRender();
      
      // Switch back to home view after a short delay
      setTimeout(() => {
        window.switchView('home');
      }, 1500);
      
    } catch (error) {
      console.error('Error saving recipe:', error);
      RecipeUI.showError('Failed to save recipe: ' + error.message);
    }
  };

  // Open recipe detail
  const openRecipeDetail = (id) => {
    const recipe = RecipeStorage.getById(id);
    if (recipe) {
      RecipeUI.showRecipeDetail(recipe);
    } else {
      RecipeUI.showError('Recipe not found');
    }
  };

  // Populate form with recipe data
  const populateForm = (recipe) => {
    const form = document.getElementById('recipeForm');
    if (!form) {
      console.error('Form not found!');
      return false;
    }

    try {
      // Set each field value
      form.querySelector('[name="title"]').value = recipe.title || '';
      form.querySelector('[name="description"]').value = recipe.description || '';
      form.querySelector('[name="prepTime"]').value = recipe.prepTime || '';
      form.querySelector('[name="cookTime"]').value = recipe.cookTime || '';
      form.querySelector('[name="totalTime"]').value = recipe.totalTime || '';
      form.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n') || '';
      form.querySelector('[name="steps"]').value = recipe.steps.join('\n') || '';
      form.querySelector('[name="difficulty"]').value = recipe.difficulty || '';
      form.querySelector('[name="imageUrl"]').value = recipe.imageUrl || '';

      // Update form title
      const formTitle = document.getElementById('formTitle');
      if (formTitle) {
        formTitle.textContent = 'Edit Recipe';
      }

      console.log('Form populated successfully with recipe:', recipe.title);
      return true;
    } catch (error) {
      console.error('Error populating form:', error);
      return false;
    }
  };

  // Edit recipe - IMPROVED VERSION
  const editRecipe = (id) => {
    const recipe = RecipeStorage.getById(id);
    if (!recipe) {
      RecipeUI.showError('Recipe not found');
      return;
    }

    console.log('Editing recipe:', recipe);

    // Store the recipe ID for editing
    editingRecipeId = id;
    window.isEditingRecipe = true;

    // Close modal if open
    const modal = document.getElementById('recipeModal');
    if (modal) modal.remove();

    // Switch to add recipe view with callback to populate form
    window.switchView('add-recipe', () => {
      const success = populateForm(recipe);
      if (!success) {
        RecipeUI.showError('Failed to load recipe for editing');
        editingRecipeId = null;
        window.isEditingRecipe = false;
      }
    });
  };

  // Delete recipe - shows custom modal
const deleteRecipe = (id) => {
  const recipe = RecipeStorage.getById(id);
  if (!recipe) {
    RecipeUI.showError('Recipe not found');
    return;
  }
  
  // Show custom confirmation modal
  RecipeUI.showDeleteConfirm(id, recipe.title);
};
// Confirm delete - actually deletes
const confirmDelete = (id) => {
  try {
    RecipeStorage.deleteRecipe(id);
    RecipeUI.showSuccess('Recipe deleted successfully!');
    
    // Close any open modals
    document.getElementById('recipeModal')?.remove();
    
    // Reload recipes
    loadAndRender();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    RecipeUI.showError('Failed to delete recipe');
  }
};


return {
  init,
  openRecipeDetail,
  editRecipe,
  deleteRecipe,
  confirmDelete  
};

})();

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', AppController.init);
