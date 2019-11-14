import * as types from "./actionTypes";
import initialState from "../app/initialState";

const categoryReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case types.LOAD_CATEGORY:
      console.log("reducer LOAD_CATEGORY: ", action.payload)
      return {
        ...state,
        // allCategories: action.payload
      }

    case types.LOAD_SEARCHBOX_VALUE:
      console.log("LOAD_SEARCHBOX_VALUE reducer called", action.payload);
      return {
        ...state,
        valueInSearchBox: action.payload
      }

    case types.LOAD_SEARCHED_CATEGORY:
      console.log("LOAD_SEARCHED_CATEGORY called: ", action.payload);
      return {
        ...state,
        filteredCategoryData: action.payload,
        valueInSearchBox:action.searchedValue
      }

    case types.CHECKBOX_VALUE_CHANGE:
      console.log("CHECKBOX_VALUE_CHANGE called...", action.payload);
      return {
        ...state,
        valueCheckedID: action.payload.id,
        valueChecked: action.payload.value
      }

    default:
      return state;
  }
};

export { categoryReducer };