// component with an input form, a + button and a submit button

import React, { Component, Fragment } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import VideoPlayer from '../VideoPlayer.jsx';
import RecipeInstructions from '../login/RecipeInstructions.jsx';
import RecipeList from './RecipeList.jsx';
import AutoComplete from './AutoComplete.jsx';
import GreetBot from './GreetBot.jsx';


// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      recipeOfTheDay, recipes, getRecipes, ingredients, saveRecipe, saveDislikeRecipe, selectRecipe,
      changeView, user, searchInProgress, autoIngredient, saveAllergy, signUp, login, buttonClicked, whichFailed, guestLogin,
      unwantedIngredients, wantedIngredients, getRestrictions, getRecipeId, recipeData, getVideoForQueryRecipe,
    } = this.props;
    return (
      <div>
        <h2 className="Lobster">
          Welcome,
          {user}
        </h2>
        <GreetBot
          signUp={signUp}
          login={login}
          buttonClicked={buttonClicked}
          whichFailed={whichFailed}
          guestLogin={guestLogin}
          user={user}
          saveAllergy={saveAllergy}
        />
        <h2 align="center">Search for a recipe</h2>
        <div className="Search-Comp">
          {searchInProgress ? <LinearProgress /> : ''}
          <AutoComplete
            ingredients={ingredients}
            addIngredient={this.addIngredient}
            getRecipes={getRecipes}
            autoIngredient={autoIngredient}
          unwantedIngredients={unwantedIngredients} 
          wantedIngredients={wantedIngredients} 
          getRestrictions={getRestrictions}
          />
        </div>

        <div className="test">
          <RecipeList
            recipes={recipes}
            saveRecipe={saveRecipe}
            saveDislikeRecipe={saveDislikeRecipe}
            selectRecipe={selectRecipe}
            changeView={changeView}
            getRecipeId={getRecipeId}
            
          />
        </div>

        <h3 id="recipeTitle">Recipe of the day</h3>
        <div className="recipe-of-the-day-container">
          <table>
            <tbody>
              <tr>
                <td className="vidPlayer"><VideoPlayer recipe={recipeOfTheDay} recipeData={recipeData} getVideoForQueryRecipe={getVideoForQueryRecipe} /></td>
                <td className="instructions"><RecipeInstructions recipe={recipeOfTheDay} recipeData={recipeData} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Search;
