// 1) Database creation & Table schemas
// 2) Function to save ingredients into the ingredients table (received from mealDB)
// 3) Function to retrieve all ingredients from the DB to make them available to client as options
// 4) Function to save a receipe into the 'liked' table
// 5) Function to save a receipe into the 'dislike' table (optional)

// const axios = require('axios');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { connection } = require('../database/index.js');

const selectSingleRecipeById = (idOriginalDB, callback) => {
  connection.query(`SELECT * FROM Recipes WHERE idRecipeFoodNutrition = ${idOriginalDB}`, (err, recipe) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipe);
    }
  });
};

const selectSingleRecipeByName = (recipeName, callback) => {
  connection.query(`SELECT * FROM Recipes WHERE recipe = '${recipeName}'`, (err, recipe) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipe);
    }
  });
};

const selectAllRecipes = (callback) => {
  connection.query('SELECT * FROM Recipes', (err, results) => {
    if (err) {
      // console.log('error in retrieving all recipes');
      callback(err, null);
    } else {
      // console.log('success in retrieving all recipes');
      callback(null, results);
    }
  });
};

const saveRecipe = (recipeName, idOriginalDB, recipeImageLink, callback) => {
  const q = [recipeName, idOriginalDB, recipeImageLink];
  connection.query('INSERT INTO Recipes (recipe, idRecipeFoodNutrition, recipeImageLink) VALUES (?, ?, ?)', q, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectLikedRecipes = (userId, callback) => {
  connection.query(`SELECT * FROM Saved WHERE idUsers = ${userId}`, (err, recipes) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, recipes);
  });
};

const saveLikedRecipe = (userId, recipeId, callback) => {
  const q = [userId, recipeId];
  connection.query('INSERT INTO Saved (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectAllRecipeOfTheDay = (callback) => {
  connection.query('SELECT * FROM RecipeOfTheDay', (err, recipes) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

const saveRecipeOfTheDay = (revcipeName, videoLink, recipeInstructions, ourDbRecipeId, cooktime, recipeImageLink, currentDate) => {
  const q = [revcipeName, videoLink, recipeInstructions, ourDbRecipeId, cooktime, recipeImageLink, currentDate];
  connection.query('INSERT INTO RecipeOfTheDay (name, link, instructions, idRecipe, cooktime, recipeImageLink, date) VALUES (?, ?, ?, ?, ?, ?, ?)', q, (err, results) => {
    if (err) {
      // console.log('could not save recipe of the day to database');
    } else {
      // console.log('successfully saved recipe of the day to the database');
    }
  });
};

const updateRecipeOfTheDay = (videoLink, ourDbRecipeId, currentDate) => {
  connection.query(`UPDATE RecipeOfTheDay SET link = '${videoLink}', idRecipe = ${ourDbRecipeId} WHERE date = ${currentDate}`, (err, results) => {
    if (err) {
      // console.log('could not update recipe of the day', err);
    } else {
      // console.log('successfully updated recipe of the day');
    }
  });
};

const selectDislikedRecipes = (userId, callback) => {
  connection.query(`SELECT * FROM Dislikes WHERE idUsers = ${userId}`, (err, recipes) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

const dislikeRecipe = (userId, recipeName, callback) => {
  const q = [userId, recipeName];
  connection.query('INSERT INTO Dislikes (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const saveIngredient = (ingredientItem) => {
  const q = [ingredientItem];
  connection.query('INSERT INTO Ingredient (ingredient) VALUES (?)', q, (err, results) => {
    if (err) {
      // console.log('error in saving ingredient to db');
    } else {
      // console.log('saved ingredient to db');
    }
  });
};

const saveRecipeIngredient = (recipeId, ingredientId) => {
  const q = [recipeId, ingredientId];
  connection.query('INSERT INTO recipesIngredients (idRecipe, ingredients) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      // console.log('error in saving id pairs to db');
    } else {
      // console.log('saved id pairs to db');
    }
  });
};

const getRecipeIngredients = (recipeId, callback) => {
  connection.query(`SELECT * FROM recipesIngredients WHERE idRecipe = ${recipeId}`, (err, ingredients) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, ingredients);
    }
  });
};

const selectAllIngredients = (callback) => {
  connection.query('SELECT * FROM Ingredient', (err, results) => {
    if (err) {
      // console.log('error in retrieving all ingredients');
    } else {
      // console.log('success in retrieving all ingredients');
      callback(results);
    }
  });
};

const selectAllUsers = (callback) => {
  connection.query('SELECT * FROM Users', (err, users) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

const saveUser = (username, password, loggedin, callback) => {
  // console.log(username, password, 'in db');
  const salt = crypto.randomBytes(16).toString('hex');
  const q = [username, crypto.pbkdf2Sync(password, salt, 500, 512, 'sha512').toString('hex'), salt, loggedin];
  return selectAllUsers((err, users) => {
    const previousInstance = _.filter(users, oldUser => oldUser.username === username).length;
    if (previousInstance === 0) {
      return connection.query('INSERT INTO Users (username, password, salt, loggedIn) VALUES (?, ?, ?, ?)', q, (err) => {
        if (err) {
          // console.log('could not insert new user into Users table');
          callback(err);
        } else {
          return selectAllUsers((err, users) => {
            const user = users.filter(oldUser => oldUser.username === username)[0];
            return callback(null, user);
          });
        }
      });
    }
    return callback('User already exists', null);
  });
};

const logoutUser = (username) => {
  connection.query(`UPDATE Users SET loggedIn = 'false' WHERE username = ${username}`, (err, results) => {
    if (err) {
      // console.log(err);
    } else {
      // console.log('Successfully logged out user');
    }
  });
};

const validatePassword = (username, password, callback) => selectAllUsers((err, users) => {
  const user = _.filter(users, oldUser => oldUser.username === username)[0];
  const hash = crypto.pbkdf2Sync(password, user.salt, 500, 512, 'sha512').toString('hex');
  if (user.password === hash) {
    loginUser(username);
    return callback(null, user);
  }
});

const generateJWT = (username, id, callback) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return callback(jwt.sign({
    user: username,
    id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret'));
};

const toAuthJSON = (username, callback) => selectAllUsers((err, users) => {
  const user = _.filter(users, oldUser => oldUser.username === username)[0];
  const returnObject = {
    id: user.id,
    username: user.username,
    token: generateJWT(username, user.id, res => res),
  };
  callback(returnObject);
});

const loginUser = (username) => {
  connection.query('UPDATE Users SET loggedIn=? WHERE username=?', [true, username], (err) => {
    if (err) {
      // console.log(err);
    } else {
      // console.log('Successfully logged in user');
    }
  });
};

const saveAllergies = (allergies, username) => {
  connection.query('SELECT id FROM Users WHERE username=?', username, (err, data) => {
    console.log(data);
    if (err) {
      console.error(err);
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const allergy of allergies) {
        connection.query('INSERT INTO Allergies (allergy) VALUES (?)', allergy, () => connection.query('SELECT id FROM Allergies WHERE allergy=?', allergy, (error, allergin) => {
          connection.query('INSERT INTO userAllergies (userId, allergyId) VALUES (?, ?)', [data[0].id, allergin[0].id], () => {
            console.log(error);
          });
        }));
      }
      return 'yay';
    }
  });
};

const addOriginalRecipe = (recipeName, ingredients, instructions, cookTime) => {
  const q = [recipeName, ingredients, instructions, cookTime];
  connection.query('INSERT INTO originalRecipes (recipe_name, ingredients, instructions, cookTime) VALUES (?, ?, ?, ?)', q, (err, results) => {
    if (err) {
      console.log('There was an error');
    } else {
      console.log(results, 'Successfully added an original recipe');
    }
  });
};

module.exports = {
  addOriginalRecipe,
  selectSingleRecipeById,
  toAuthJSON,
  validatePassword,
  selectSingleRecipeByName,
  selectAllRecipes,
  saveRecipe,
  selectLikedRecipes,
  saveLikedRecipe,
  selectAllRecipeOfTheDay,
  saveRecipeOfTheDay,
  updateRecipeOfTheDay,
  selectDislikedRecipes,
  dislikeRecipe,
  saveIngredient,
  saveRecipeIngredient,
  getRecipeIngredients,
  selectAllIngredients,
  selectAllUsers,
  saveUser,
  logoutUser,
  loginUser,
  saveAllergies,
};
