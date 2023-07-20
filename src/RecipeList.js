import React, { useEffect, useState } from 'react';
import useBeerStore from './store';

const RecipeList = () => {
  const recipes = useBeerStore((state) => state.recipes);
  const setRecipes = useBeerStore((state) => state.setRecipes);

  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const fetchNextRecipes = async () => {
      const response = await fetch(`https://api.punkapi.com/v2/beers?page=2`);
      const data = await response.json();
      setRecipes(data.slice(0, 15));
    };

    if (recipes.length === 0 ) {
      fetchNextRecipes();
    }
  }, [recipes, setRecipes]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://api.punkapi.com/v2/beers?page=1');
      const data = await response.json();
      setRecipes(data.slice(0, 15)); 
    };
      fetchRecipes();
  }, [ setRecipes]);

  const handleRecipeClick = (recipeId, event) => {
    event.preventDefault();

    if (event.button === 2) {
      if (selectedRecipes.includes(recipeId)) {
        setSelectedRecipes((prevSelectedRecipes) =>
          prevSelectedRecipes.filter((id) => id !== recipeId)
        );
      } else {
        setSelectedRecipes((prevSelectedRecipes) => [
          ...prevSelectedRecipes,
          recipeId,
        ]);
      }
    }
  };

  const handleDeleteClick = () => {
    const updatedRecipes = recipes.filter(
      (recipe) => !selectedRecipes.includes(recipe.id)
    );

    setRecipes(updatedRecipes.slice(0, 15)); 
    setSelectedRecipes([]);
  };

  const navigateToRecipe = (recipeId) => {

    window.location.href = `/recipe/${recipeId}`;
  };

  return (
    <div>
      <h2>Beer Recipes</h2>
      {selectedRecipes.length > 0 && (
        <button class="button" onClick={handleDeleteClick}>Delete</button>
      )}
      <ol>
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            onContextMenu={(e) => handleRecipeClick(recipe.id, e)}
            style={{
              backgroundColor: selectedRecipes.includes(recipe.id)
                ? 'pink'
                : 'transparent',
            }}
          >
            <button
              onClick={() => navigateToRecipe(recipe.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {recipe.name}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeList;
