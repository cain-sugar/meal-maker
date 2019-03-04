import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    const { ingredients, wantedIngredients, unwantedIngredients, getRestrictions } = this.props;
    this.ingredients = ingredients;
    this.state = {
      suggestions: [],
      text: '',
      dislikeText: '',
      selectedIngredients: {},
      color: 'primary',
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextChange2 = this.onTextChange2.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.sendWantedAndUnwantedIngredientsToParentNode = this.sendWantedAndUnwantedIngredientsToParentNode.bind(this);
    // this.disingredientsNotToAdd = this.ingredientsNotToAdd.bind(this);
  }

  // onTextChange(e) {
  //   const { ingredients } = this.props;
  //   const { value } = e.target;
  //   let suggestions = [];
  //   if (value.length > 0) {
  //     const regex = new RegExp(`^${value}`, 'i');
  //     suggestions = ingredients.sort().filter(v => regex.test(v));
  //   }
  //   this.setState({ suggestions, text: value });
  // }

  onTextChange(e) {
    const { text, suggestions } = this.state;
    const { autoIngredient } = this.props;
    const { value } = e.target;
    this.setState({ text: value });
    autoIngredient(text, (ingredients) => {
      const sugg = ingredients.map(i => i.food_name);
      this.setState({
        suggestions: sugg,
        text: value,
        color: 'primary',
      });
    });
  }

  onTextChange2(e) {
    console.log(e);
    const { dislikeText, suggestions } = this.state;
    const { autoIngredient } = this.props;
    const { value } = e.target;
    this.setState({ dislikeText: value });
    autoIngredient(dislikeText, (ingredients) => {
      const sugg = ingredients.map(i => i.food_name);
      console.log(sugg);
      console.log(suggestions);
      this.setState({
        suggestions: sugg,
        dislikeText: value,
        color: 'secondary',
      });
    });
  }


  addIngredient(ingredient) {
    const { selectedIngredients, color } = this.state;
    const { unwantedIngredients, wantedIngredients } = this.props;
    selectedIngredients[ingredient] = color;
    if (color === 'primary') {
      wantedIngredients.push(ingredient);
      unwantedIngredients.push(ingredient); ////////////// MAY NEED TO REMOVE
    } else {
      unwantedIngredients.push(ingredient);
    }
    this.setState({
      selectedIngredients,
      text: '',
      dislikeText: '',
    });
  }

  suggestionSelected(value) {
    this.setState({
      text: value,
      suggestions: [],
    });
    this.addIngredient(value);
  }

  handleDelete(label) {
    const { selectedIngredients } = this.state;
    const deconstructedIngredientList = Object(selectedIngredients);
    delete deconstructedIngredientList[label];
    this.setState({ selectedIngredients: deconstructedIngredientList });
  }

  sendWantedAndUnwantedIngredientsToParentNode(wanted, unwanted) {
    const { getRecipes, getRestrictions } = this.props;
    getRecipes(wanted.join(', '), unwanted.join(', '));
    // getRestrictions(unwanted.join(', '));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="auto-ulist">
        {suggestions.map(ingredient => (
          <li
            className="auto-list"
            onClick={() => this.suggestionSelected(ingredient)}
            key={ingredient}
          >
            {ingredient}
          </li>
        ))}
      </ul>
    );
  }


  render() {
    const { dislikeText, text, selectedIngredients } = this.state;
    const { getRecipes, unwantedIngredients, wantedIngredients } = this.props;
    // window.wantedIngred = wantedIngredients;
    // window.unwantedIngred = unwantedIngredients;
    return (
      <div className="AutoCompleteComponent">
        <div className="auto-complete">
          <ul>
            {Object.keys(selectedIngredients).map(ingredient => (
              <Chip
                label={ingredient}
                color={selectedIngredients[ingredient]}
                onDelete={() => this.handleDelete(ingredient)}
              />
            ))}
          </ul>
          <input value={text} onChange={this.onTextChange} type="text" placeholder=" What's in your fridge?" />

        </div>
        <div className="buttons">
          <Button className="search" variant="contained" color="primary" type="button" onClick={() => this.sendWantedAndUnwantedIngredientsToParentNode(wantedIngredients, unwantedIngredients)}>Search</Button>
          <div>Exclude Ingredients</div>
        </div>
        <input value={dislikeText} onChange={this.onTextChange2} type="text" placeholder=" What should we leave out?" />
        {this.renderSuggestions()}
      </div>
    );
  }
}
//  line 111 onClick = {() => this.dislikedIngredients()}
export default AutoComplete;
