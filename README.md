# 🍳 Recipe Manager

A modern, mobile-responsive web application for managing your favorite recipes. Built with vanilla JavaScript, HTML, and Tailwind CSS with localStorage for data persistence.

## 🌐 Live Demo

**[View Live Demo](https://sattubahir.github.io/Recipe-Manager/)**

---
## 📋 Table of Contents

- [Features](#features)
- [How to Run the App](#how-to-run-the-app)
- [Data Structure](#data-structure)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)

---

## ✨ Features

- **CRUD Operations**: Create, Read, Update, and Delete recipes
- **Search Functionality**: Search recipes by title
- **Multiple Filters**: 
  - Filter by difficulty (Easy, Medium, Hard)
  - Quick Meals filter (recipes under 20 minutes)
- **Responsive Design**: Fully mobile-responsive with hamburger menu
- **Dashboard Statistics**: View total recipes, easy recipes, quick meals, and recent additions
- **localStorage Persistence**: All data is saved locally in the browser
- **Custom Delete Confirmation**: Stylish modal for delete confirmations
- **Multi-View Interface**: Home, Add Recipe, and All Recipes views
- **Pre-loaded Sample Recipes**: 5 authentic Indian recipes included

---

## 🚀 How to Run the App

### Option 1: Using Live Server (Recommended)

1. **Download/Clone the Project**
2. **Install VS Code Extension** (if not already installed)
- Open VS Code
- Install "Live Server" extension by Ritwick Dey

3. **Run the Application**
- Right-click on `index.html`
- Select "Open with Live Server"
- The app will open in your browser at `http://127.0.0.1:5500/`

### Option 2: Direct File Opening

1. Simply double-click `index.html` file
2. The app will open in your default browser
3. **Note**: Some features may not work properly due to CORS restrictions

## 📊 Data Structure in localStorage

### Storage Key
### Data Format
**The app stores an array of recipe objects in JSON format:**
```JSON
[
{
"id": 1,
"title": "Recipe Name",
"description": "Brief description of the recipe",
"ingredients": [
"1 cup ingredient 1",
"2 tablespoons ingredient 2",
"..."
],
"steps": [
"Step 1 description",
"Step 2 description",
"..."
],
"prepTime": 15, // in minutes
"cookTime": 25, // in minutes
"totalTime": 40, // in minutes
"difficulty": "easy", // values: "Easy", "Medium", "Hard"
"imageUrl": "https://example.com/image.jpg"
}
]
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Number | Yes | Unique identifier (auto-generated) |
| `title` | String | Yes | Recipe name |
| `description` | String | Yes | Brief description (1-2 sentences) |
| `ingredients` | Array | Yes | List of ingredients with quantities |
| `steps` | Array | Yes | Step-by-step cooking instructions |
| `prepTime` | Number | Yes | Preparation time in minutes |
| `cookTime` | Number | Yes | Cooking time in minutes |
| `totalTime` | Number | Yes | Total time (prep + cook) |
| `difficulty` | String | Yes | Recipe difficulty level |
| `imageUrl` | String | No | URL to recipe image (defaults to placeholder) |

### Accessing localStorage Data

**View in Browser Console:**


### File Responsibilities

**index.html**
- Page structure and layout
- Navigation sidebar
- Multiple views (Home, Add Recipe, All Recipes)
- Form inputs and buttons
- Inline scripts for view navigation and mobile menu

**recipes.js**
- localStorage initialization
- CRUD operations (Create, Read, Update, Delete)
- Search and filter functions
- Data validation
- Statistics calculation

**ui.js**
- Rendering recipe cards
- Rendering statistics dashboard
- Modal components (detail view, delete confirmation)
- Success/error notifications
- Filter button state management

**app.js**
- Application initialization
- Event listener setup
- Form submission handling
- View navigation coordination
- Recipe edit/delete orchestration

---

## 📖 Usage Guide

### Adding a New Recipe

1. Click "Add Recipe" in the sidebar or "+ Add New Recipe" button
2. Fill in all required fields:
   - Recipe Title
   - Description
   - Prep Time, Cook Time, Total Time
   - Ingredients (one per line)
   - Steps (one per line)
   - Difficulty level
   - Image URL (optional)
3. Click "Save Recipe"
4. Recipe is automatically saved to localStorage

### Editing a Recipe

1. Click the "Edit" button on any recipe card
2. Modify the fields as needed
3. Click "Save Recipe" to update
4. Changes are immediately saved to localStorage

### Deleting a Recipe

1. Click the "Delete" button on any recipe card
2. Confirm deletion in the popup modal
3. Recipe is permanently removed from localStorage

### Searching Recipes

1. Enter search term in the search bar
2. Click "Search" or press Enter
3. Results filter in real-time by title

### Filtering Recipes

**By Difficulty:**
- Click "All", "Easy", "Medium", or "Hard" buttons

**Quick Meals:**
- The "Quick Meals" stat shows recipes under 20 minutes
- (Optional filter button can be added)

---

## ⚠️ Assumptions and Limitations

### Assumptions

1. **Browser Support**: Modern browsers with ES6 support and localStorage enabled
2. **Internet Connection**: Required for Tailwind CSS CDN and recipe images
3. **Image URLs**: Assumes valid, publicly accessible image URLs
4. **Single User**: Designed for single-user, local usage (no authentication)
5. **Data Integrity**: User provides valid recipe data through the form
6. **Time Format**: All time values are assumed to be in minutes
7. **Language**: Interface is in English only
8. **Screen Size**: Optimized for screens 320px and above

### Limitations

1. **No Backend**: All data stored in browser localStorage
   - Data lost if browser cache is cleared
   - No sync across devices or browsers
   - Maximum storage ~5-10MB (varies by browser)

2. **No User Authentication**: Anyone with access to the browser can modify recipes

3. **Image Hosting**: App doesn't host images
   - Relies on external URLs
   - Broken links if external images are removed

4. **No Export/Import**: Cannot backup or restore data easily
   - Manual copy-paste of localStorage required

5. **Search Limitations**: 
   - Only searches by title (not ingredients or description)
   - Case-sensitive matching

6. **No Recipe Sorting**: Recipes cannot be sorted by time, difficulty, or date added

7. **Limited Validation**: 
   - No ingredient quantity validation
   - No duplicate recipe detection
   - No automatic total time calculation

8. **Offline Functionality**: Tailwind CSS requires internet on first load

9. **No Print Feature**: Recipes cannot be printed in formatted style

10. **No Tags/Categories**: No way to categorize recipes by cuisine, meal type, etc.

---

## 🐛 Known Issues

1. **localStorage Quota**
   - **Issue**: Browser may reject new recipes if localStorage limit exceeded
   - **Workaround**: Delete unused recipes regularly
   - **Status**: No fix planned (inherent localStorage limitation)

2. **Image URL Validation**
   - **Issue**: Invalid URLs show broken image icon
   - **Workaround**: Always test image URLs before saving
   - **Status**: Under consideration for future update

### Minor Issues

1. **Mobile Keyboard Overlap**
   - **Issue**: On some mobile devices, keyboard overlaps form inputs
   - **Workaround**: Scroll manually after keyboard appears
   - **Status**: Investigating

2. **Long Recipe Names**
   - **Issue**: Very long titles may overflow card layout
   - **Workaround**: Keep titles under 50 characters
   - **Status**: CSS truncation to be added

3. **Browser Back Button**
   - **Issue**: Browser back button doesn't work with view navigation
   - **Workaround**: Use in-app navigation
   - **Status**: Would require URL routing (not planned)


### Browser-Specific Issues

- **Safari iOS**: Smooth scrolling may be jerky on older devices
- **Firefox**: Animation performance slightly slower
- **Edge Legacy**: Not supported (use Chromium-based Edge)

---


## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (Play CDN via script tag)
- **Storage**: Browser localStorage API
- **Architecture**: Modular JavaScript with IIFE pattern
- **Icons**: SVG (inline)
- **Responsive**: Mobile-first design

---

