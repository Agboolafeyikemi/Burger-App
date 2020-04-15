import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      // .get("https://burger-app-78d24.firebaseio.com/ingredients.json")
      .get("https://burger-app2-afcbe.firebaseio.com/ingredients.json")
      .then(response => dispatch(setIngredient(response.data)))
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
