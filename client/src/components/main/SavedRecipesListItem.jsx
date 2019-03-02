// an item with
// a recipe name
// a percentage match
// ingredients
import React from 'react';

const SavedRecipeListItem = ({ savedRecipe, changeView, selectRecipe }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>
            <img src={savedRecipe.image} alt="" />
          </td>
          <td>
            <div
              className="name"
              onClick={() => {
                selectRecipe(savedRecipe);
                changeView('recipe');
              }}
              role="presentation"
            >
              <b>
                {savedRecipe.name}
              </b>
            </div>
            <div className="origRecipeName">
              Recipe Name:
              {' '}
              {savedRecipe.recipe_name}
            </div>
            <div className="origRecipeIngredients">
              Ingredients:
              {' '}
              {savedRecipe.ingredients}
            </div>
            <div className="origRecipeInstructions">
              Instructions:
              {' '}
              {savedRecipe.instructions}
            </div>
            <div className="origCookTime">
            Cook Time:
              {' '}
              {savedRecipe.cookTime}
              {' '}
              minutes
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);


export default SavedRecipeListItem;
