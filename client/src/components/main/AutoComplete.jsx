import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    const { ingredients } = this.props;
    this.ingredients = ingredients;
    this.state = {
      suggestions: [],
      text: '',
      dislikeText: '',
      selectedIngredients: [],
      // dislikedIngredients: [],
      // textBoxForDislikedIngredients: false,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextChange2 = this.onTextChange2.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    // this.disingredientsNotToAdd = this.ingredientsNotToAdd.bind(this);
  }

  onTextChange(e) {
    const { ingredients } = this.props;
    const { value } = e.target;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = ingredients.sort().filter(v => regex.test(v));
    }
    this.setState({ suggestions, text: value });
  }

  onTextChange2(e) {
    const { ingredients } = this.props;
    const { value } = e.target;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = ingredients.sort().filter(v => regex.test(v));
    }
    this.setState({ suggestions, dislikeText: value });
  }


  addIngredient(ingredient) {
    const { selectedIngredients } = this.state;
    selectedIngredients.push(ingredient);
    this.setState({
      selectedIngredients,
      text: '',
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
    this.setState((state) => {
      const deconstructedIngredientList = [...state.selectedIngredients];
      const index = deconstructedIngredientList.indexOf(label);
      deconstructedIngredientList.splice(index, 1);
      console.log(deconstructedIngredientList);
      // [...state.selectedIngredients] = deconstructedIngredientList;
      this.setState({ selectedIngredients: deconstructedIngredientList });
    });
  }

  // ingredientsNotToAdd() {
  //   this.setState({
  //     textBoxForDislikedIngredients? false : true;
  //   })
  // }

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
    const { getRecipes } = this.props;
    return (
      <div className="AutoCompleteComponent">
        <div className="auto-complete">
          <ul>
            {selectedIngredients.map(ingredient => (
              <Chip
                label={ingredient}
                color="primary"
                onDelete={() => this.handleDelete(ingredient)}
              />
            ))}
          </ul>
          <input value={text} onChange={this.onTextChange} type="text" placeholder=" What's in your fridge?" />

        </div>
        <div className="buttons">
          <Button className="search" variant="contained" color="primary" type="button" onClick={() => getRecipes(selectedIngredients.join(', '))}>Search</Button>
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
