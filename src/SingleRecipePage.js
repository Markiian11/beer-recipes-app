import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
      const data = await response.json();
      setRecipe(data[0]); // Assuming the API returns a single recipe object
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className='recipe-card'>
      <h2>{recipe.name}</h2>
      <h3>{recipe.id}</h3>
      <p>{recipe.tagline}</p>
      <p>{recipe.description}</p>
    </div>
  );
};

export default SingleRecipePage;
