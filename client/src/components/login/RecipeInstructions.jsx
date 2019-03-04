import React from 'react';
import Paper from '@material-ui/core/Paper';

class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.recipe,
    };
  }

  render() {
    // const { currentVideo, current } = this.state;
    const { recipeData } = this.props;
    let video;
    let steps;

    if (typeof (recipeData.instructions) === 'string') {
      // video = currentVideo;
      steps = recipeData.instructions.split('\n');
    } else {
      // video = currentVideo;
      steps = recipeData.instructions;
    }

    // if (typeof (recipeData.ingredients) === 'string') {
    //   this.props.ingredients = recipeData.ingredients.split('\n').join(', ');
    // } else {
    //   this.props.ingredients = recipeData.ingredients.join(', ');
    // }

    return (
      <div className="instructions-list">
        <h3 className="recTitle">{recipeData.name}</h3>
        <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
          <b>Cook Time: </b>
          {recipeData.cookTime}
          {' '}
          minutes
          <br />
          <b>Ingredients: </b>
          {recipeData.ingredients}
          <br />
          <br />
          <b>Instructions: </b>
          <ul>
            {recipeData.instructions}  {/* {steps.map(step => <li key={step}>{step}</li>)} */}
          </ul>
        </Paper>
      </div>
    );
  }
}
export default RecipeInstructions;
