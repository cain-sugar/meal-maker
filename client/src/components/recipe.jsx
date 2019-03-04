// individual recipe view containing the recipe instructions and a youtube video player

import React from 'react';
import RecipeInstructions from './login/RecipeInstructions.jsx';
import VideoPlayer from './VideoPlayer.jsx';

// const recipeToShow = {
//   cookTime: recipeData.cookTime,
//   image: recipeData.image,
//   ingredients: recipeData.ingredients,
//   instructions: recipeData.instructions,
// };
// selectRecipe(recipeToShow);
// changeView('recipe');
const Recipe = ({ selectedRecipe, recipeData }) => {
  return (
    <div className="selected-recipe">
      <table>
        <tbody>
          <tr>
            <td className="vidPlayer"><VideoPlayer recipe={selectedRecipe} /></td>
            <td className="instructions">
              <RecipeInstructions recipeData={recipeData} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
