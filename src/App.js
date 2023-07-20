import React from 'react';
import RecipeList from './RecipeList';
import SingleRecipePage from './SingleRecipePage';
import { Routes, Route } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    <div>
        <Routes>
          <Route index element={<RecipeList/>}/>
          <Route path='/recipe/:id' element={<SingleRecipePage/>}/>
        </Routes>
    </div>
  );
};

export default App;


