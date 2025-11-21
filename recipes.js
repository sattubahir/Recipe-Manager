// recipes.js - Data Management & localStorage

const RecipeStorage = (() => {
  const STORAGE_KEY = 'recipes';

  // Sample initial recipes
  const defaultRecipes = [
    {
      id: 1,
  title: 'Maharashtrian Masala Bhaat',
  description: 'A flavorful one-pot rice dish cooked with vegetables and aromatic spices, perfect for weeknight dinners.',
  ingredients: [
    '1 cup Basmati rice (washed and soaked for 15 minutes)',
    '2 tablespoons oil or ghee',
    '1 teaspoon cumin seeds',
    '1 teaspoon mustard seeds',
    '1 bay leaf',
    '2-3 cloves',
    '1 small cinnamon stick',
    '1 large onion (finely chopped)',
    '1 tomato (chopped)',
    '1/2 cup mixed vegetables (carrots, peas, beans)',
    '2 green chilies (slit)',
    '1 teaspoon ginger-garlic paste',
    '1/2 teaspoon turmeric powder',
    '1 teaspoon red chili powder',
    '1 teaspoon garam masala',
    '2 cups water',
    'Salt to taste',
    'Fresh coriander leaves for garnish'
  ],
  steps: [
    'Heat oil or ghee in a pressure cooker or heavy-bottomed pot',
    'Add cumin seeds, mustard seeds, bay leaf, cloves, and cinnamon stick. Let them crackle',
    'Add chopped onions and green chilies. Sauté until onions turn golden brown',
    'Add ginger-garlic paste and sauté for 1 minute until raw smell disappears',
    'Add chopped tomatoes and cook until they turn soft and mushy',
    'Add mixed vegetables and sauté for 2-3 minutes',
    'Add turmeric powder, red chili powder, and salt. Mix well',
    'Drain the soaked rice and add to the pot. Gently mix with the masala',
    'Add 2 cups of water and bring to a boil',
    'Add garam masala and mix once',
    'Cover and cook on low flame for 15-20 minutes until rice is fully cooked (or 2 whistles in pressure cooker)',
    'Let the pressure release naturally if using cooker',
    'Fluff the rice gently with a fork',
    'Garnish with fresh coriander leaves and serve hot with raita or papad'
  ],
  prepTime: 15,
  cookTime: 25,
  totalTime: 40,
  difficulty: 'Easy',
  imageUrl: 'https://i.ytimg.com/vi/GHK5QqG8P3U/maxresdefault.jpg'
    },
    {
       id: 2,
  title: 'Indian Egg Curry',
  description: 'Rich and flavorful egg curry with tomato-onion gravy and aromatic spices.',
  ingredients: [
    '4-5 hard boiled eggs',
    '2 tablespoons oil or ghee',
    '1 teaspoon cumin seeds',
    '1 bay leaf',
    '2-3 cloves',
    '2-3 green cardamoms',
    '1 small cinnamon stick',
    '2 medium onions (finely chopped)',
    '1 tablespoon ginger-garlic paste',
    '3 medium tomatoes (pureed or finely chopped)',
    '2 green chilies (slit)',
    '1/2 teaspoon turmeric powder',
    '1 teaspoon red chili powder',
    '1 teaspoon Kashmiri red chili powder (for color)',
    '1.5 teaspoons coriander powder',
    '1/2 teaspoon garam masala powder',
    '2 tablespoons fresh cream or beaten curd',
    '1 teaspoon kasuri methi (dried fenugreek leaves)',
    '1-1.5 cups water',
    'Salt to taste',
    'Fresh coriander leaves for garnish'
  ],
  steps: [
    'Boil the eggs, peel them, and prick them lightly with a fork for better flavor absorption',
    'Heat 1 teaspoon oil in a pan and lightly fry the boiled eggs with a pinch of turmeric and chili powder until golden. Set aside',
    'In the same pan, heat 2 tablespoons oil or ghee on medium heat',
    'Add cumin seeds, bay leaf, cloves, cardamoms, and cinnamon stick. Let them crackle',
    'Add chopped onions and green chilies. Sauté until onions turn golden brown (4-5 minutes)',
    'Add ginger-garlic paste and cook for 1-2 minutes until the raw smell disappears',
    'Add pureed tomatoes and mix well. Cook covered for 5 minutes until tomatoes are soft',
    'Add turmeric powder, red chili powder, Kashmiri chili powder, and coriander powder. Mix well',
    'Add salt and cook the masala for 6-7 minutes until oil separates from the sides',
    'Add 1-1.5 cups water depending on desired gravy consistency. Bring to a boil',
    'Add garam masala powder and crushed kasuri methi. Mix well',
    'Gently add the fried eggs to the gravy. Coat them well with the curry',
    'Simmer for 5-6 minutes on low heat so eggs absorb the flavors',
    'Add fresh cream or beaten curd and mix gently. Simmer for 2 more minutes',
    'Garnish with fresh coriander leaves and serve hot with roti, naan, or rice'
  ],
  prepTime: 15,
  cookTime: 25,
  totalTime: 40,
  difficulty: 'Easy',
  imageUrl: 'https://www.sharmispassions.com/wp-content/uploads/2015/06/EggCurry5-683x1024.jpg'
    },
    {
       id: 3,
  title: 'Masala Maggi',
  description: 'Popular Indian street-style instant noodles with vegetables and aromatic spices.',
  ingredients: [
    '2 packets Maggi noodles',
    '1 tablespoon oil or butter',
    '1/2 teaspoon cumin seeds',
    '1 small onion (finely chopped)',
    '1 small tomato (finely chopped)',
    '1 green chili (finely chopped)',
    '1/4 cup mixed vegetables (carrots, peas, capsicum - finely chopped)',
    '1/2 teaspoon ginger-garlic paste',
    '1/4 teaspoon turmeric powder',
    '1/2 teaspoon red chili powder',
    '1/2 teaspoon chaat masala',
    '2 Maggi masala tastemaker sachets (from the packets)',
    '2.5 cups water',
    'Salt to taste (adjust as tastemaker has salt)',
    '2 tablespoons fresh coriander leaves (chopped)',
    'Lemon juice (optional)',
    'Grated cheese (optional topping)'
  ],
  steps: [
    'Heat oil or butter in a pan on medium flame',
    'Add cumin seeds and let them crackle',
    'Add chopped onions and green chili. Sauté for 1-2 minutes until onions turn translucent',
    'Add ginger-garlic paste and sauté for 30 seconds',
    'Add all the chopped vegetables (carrots, peas, capsicum). Stir-fry for 2 minutes',
    'Add chopped tomatoes and cook for 1 minute until slightly soft',
    'Add turmeric powder, red chili powder, and mix well',
    'Add 2.5 cups of water and bring to a rolling boil',
    'Break the Maggi noodle cakes and add to the boiling water',
    'Add the Maggi tastemaker sachets and salt (if needed)',
    'Cook for 2-3 minutes, stirring occasionally to prevent sticking',
    'Add chaat masala and mix gently',
    'Cook until noodles are soft but not mushy',
    'Garnish with fresh coriander leaves',
    'Squeeze lemon juice on top and add grated cheese if desired. Serve hot'
  ],
  prepTime: 5,
  cookTime: 8,
  totalTime: 13,
  difficulty: 'Easy',
      imageUrl: 'https://www.natashamohan.com/wp-content/uploads/2024/08/87a05bc768-1-jpg.webp'
    },
    {
        id: 4,
  title: 'Puran Poli',
  description: 'Maharashtrian Special Dish - Sweet lentil stuffed flatbread, a traditional festive delicacy.',
  ingredients: [
    '1 cup chana dal (split bengal gram)',
    '3 cups water (for cooking dal)',
    '1 cup jaggery (grated or powdered)',
    '1 tablespoon ghee (for puran)',
    '1/2 teaspoon cardamom powder',
    '1/4 teaspoon nutmeg powder',
    '1/2 teaspoon dry ginger powder (optional)',
    '1.5 cups whole wheat flour',
    '1/2 cup all-purpose flour (maida)',
    '1/4 teaspoon turmeric powder',
    '1/4 teaspoon salt',
    '2 tablespoons oil',
    'Water as needed for kneading',
    'Extra ghee for roasting',
    'Rice flour or maida for dusting'
  ],
  steps: [
    'Rinse chana dal thoroughly and pressure cook with 3 cups water for 5-6 whistles until soft but not mushy',
    'Drain the cooked dal completely (save the water for other use)',
    'Mash the dal using a strainer or grinder until smooth paste-like consistency',
    'Heat 1 tablespoon ghee in a heavy-bottom pan, add the mashed dal and jaggery',
    'Cook on low heat, stirring continuously until the mixture thickens and leaves the sides of the pan (15-20 minutes)',
    'Add cardamom powder, nutmeg powder, and dry ginger powder. Mix well and let it cool completely',
    'For the dough: Mix wheat flour, maida, turmeric powder, and salt in a large bowl',
    'Add 2 tablespoons oil and mix well. Gradually add water and knead into a soft, smooth dough',
    'Apply oil on the dough, cover with damp cloth and rest for 20-30 minutes',
    'Divide the dough into small equal-sized balls and the puran filling into slightly larger balls',
    'Take a dough ball, flatten it, dust with flour, and roll into a 3-inch disc',
    'Place a puran ball in the center, bring the edges together to seal completely',
    'Dust with flour and gently roll into a 6-7 inch diameter flatbread, being careful not to let the filling burst out',
    'Heat a griddle (tawa), place the rolled poli and cook on medium heat',
    'Apply ghee on both sides and cook until golden brown spots appear',
    'Serve hot puran poli with ghee on top, along with milk or katachi amti (dal curry)'
  ],
  prepTime: 40,
  cookTime: 30,
  totalTime: 70,
  difficulty: 'Medium',
      imageUrl: 'https://www.travellersofindia.com/wp-content/uploads/2023/06/Puran_Poli_Travellersofindia.com_.jpeg'
    },
    {
  id: 5,
  title: 'Hyderabadi Chicken Dum Biryani',
  description: 'Aromatic and royal layered rice dish with marinated chicken, fragrant spices, and saffron, slow-cooked to perfection.',
  ingredients: [
    '500g chicken (cut into medium pieces)',
    '2 cups Basmati rice (soaked for 30 minutes)',
    '1 cup yogurt (whisked)',
    '2 large onions (thinly sliced)',
    '3 tomatoes (chopped)',
    '2 tablespoons ginger-garlic paste',
    '4-5 green chilies (slit)',
    '1/2 cup fresh mint leaves',
    '1/2 cup fresh coriander leaves',
    '1 teaspoon red chili powder',
    '1/2 teaspoon turmeric powder',
    '1 tablespoon biryani masala powder',
    '1 teaspoon garam masala powder',
    '4-5 cloves',
    '2-3 green cardamoms',
    '2-3 black cardamoms',
    '1 small cinnamon stick',
    '1 bay leaf',
    '1 star anise',
    '1/2 teaspoon shahi jeera (caraway seeds)',
    'A pinch of saffron strands (soaked in 1/4 cup warm milk)',
    '1/2 cup fried onions (birista)',
    '4 tablespoons ghee',
    '3 tablespoons oil',
    'Salt to taste',
    '1 tablespoon lemon juice',
    '2 tablespoons rose water or kewra water',
    '4-5 cups water (for boiling rice)'
  ],
  steps: [
    'Marinate chicken with yogurt, 1 tablespoon ginger-garlic paste, red chili powder, turmeric, biryani masala, lemon juice, half of mint and coriander leaves, and salt. Refrigerate for at least 1 hour',
    'Heat 3 tablespoons oil in a heavy-bottomed pan. Deep fry thinly sliced onions until golden brown and crispy. Remove and set aside for birista',
    'In the same pan with remaining oil, add whole spices (cloves, cardamoms, cinnamon, bay leaf, star anise, shahi jeera) and let them crackle',
    'Add remaining ginger-garlic paste and green chilies. Sauté for 1 minute',
    'Add chopped tomatoes and cook until soft and oil separates (about 5-7 minutes)',
    'Add the marinated chicken and cook on high heat for 5 minutes, stirring occasionally',
    'Reduce heat to low, cover and cook chicken for 15-20 minutes until 70% done. The gravy should be thick, not watery',
    'Meanwhile, boil 4-5 cups of water in a large pot. Add salt, 2 green cardamoms, 1 bay leaf, and 1 tablespoon ghee',
    'Add soaked and drained rice. Cook until 70% done (rice should still have a bite). Drain immediately',
    'For layering: Spread half of the partially cooked chicken gravy in a heavy-bottomed pot',
    'Layer half of the partially cooked rice over the chicken',
    'Sprinkle half of the fried onions, remaining mint and coriander leaves, and half of the saffron milk',
    'Add the remaining chicken and gravy as the next layer',
    'Top with remaining rice, fried onions, saffron milk, rose water, and dots of ghee',
    'Cover the pot with aluminum foil, then place a tight-fitting lid on top',
    'Cook on high heat for 3-4 minutes until you see steam escaping',
    'Reduce to lowest heat and cook (dum) for 25-30 minutes. Do not open the lid during this time',
    'Alternatively, after sealing, place the pot in a preheated oven at 180°C (350°F) for 25-30 minutes',
    'Turn off heat and let it rest for 5 minutes before opening',
    'Gently mix the biryani from bottom to top using a flat spatula, being careful not to break the rice grains',
    'Serve hot with raita, shorba, and boiled eggs'
  ],
  prepTime: 90,
  cookTime: 60,
  totalTime: 150,
  difficulty: 'Hard',
  imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400'
}

  ];

  // Initialize localStorage on first load
  const init = () => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecipes));
        return defaultRecipes;
      }
      return JSON.parse(existing);
    } catch (error) {
      console.error('Error initializing localStorage:', error);
      return defaultRecipes;
    }
  };

  // Get all recipes
  const getAll = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultRecipes;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return defaultRecipes;
    }
  };

  // Get single recipe by ID
  const getById = (id) => {
    const recipes = getAll();
    return recipes.find(r => r.id === parseInt(id));
  };

  // Add new recipe
  const add = (recipe) => {
    if (!validateRecipe(recipe)) {
      throw new Error('Invalid recipe data');
    }
    const recipes = getAll();
    recipe.id = recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
    recipes.push(recipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return recipe;
  };

  // Update recipe
  const update = (id, updatedData) => {
    if (!validateRecipe(updatedData)) {
      throw new Error('Invalid recipe data');
    }
    const recipes = getAll();
    const index = recipes.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    recipes[index] = { ...recipes[index], ...updatedData, id: parseInt(id) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return recipes[index];
  };

  // Delete recipe
  const deleteRecipe = (id) => {
    const recipes = getAll();
    const filteredRecipes = recipes.filter(r => r.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecipes));
  };

  // Validate recipe structure
  const validateRecipe = (recipe) => {
    return (
      recipe.title &&
      recipe.title.trim() !== '' &&
      recipe.description &&
      recipe.ingredients &&
      Array.isArray(recipe.ingredients) &&
      recipe.ingredients.length > 0 &&
      recipe.steps &&
      Array.isArray(recipe.steps) &&
      recipe.steps.length > 0 &&
      recipe.prepTime &&
      recipe.cookTime &&
      recipe.totalTime &&
      ['Easy', 'Medium', 'Hard'].includes(recipe.difficulty)
    );
  };

  // Search recipes by title
  const search = (query) => {
    const recipes = getAll();
    return recipes.filter(r =>
      r.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filter by difficulty
  const filterByDifficulty = (difficulty) => {
    const recipes = getAll();
    if (difficulty === 'all') return recipes;
    return recipes.filter(r => r.difficulty === difficulty);
  };

  // Filter by max prep time
  const filterByPrepTime = (maxTime) => {
    const recipes = getAll();
    return recipes.filter(r => r.prepTime <= maxTime);
  };

  // Get stats
  const getStats = () => {
    const recipes = getAll();
    return {
      total: recipes.length,
      Easy: recipes.filter(r => r.difficulty === 'Easy').length,
     Medium: recipes.filter(r => r.totalTime && r.totalTime <= 20).length,
      Hard: recipes.filter(r => r.difficulty === 'Hard').length,
      recent: recipes.slice(-4)
    };
  };

  return {
    init,
    getAll,
    getById,
    add,
    update,
    deleteRecipe,
    validateRecipe,
    search,
    filterByDifficulty,
    filterByPrepTime,
    getStats
  };
})();
