import * as types from "./actionTypes";
import initialState from "../app/initialState";

const attributeReducer = (state = initialState.attributeSearch, action) => {
    console.log(action,"__________________________________");
  switch (action.type) {
    case types.LOAD_ATTRIBUTES:
      console.log("reducer LOAD_ATTRIBUTES: ", action.payload)
      return {
        ...state,
        allAttributes: action.payload
      }

    case types.LOAD_SEARCHBOX_VALUE_ATTRIBUTES:
      console.log("LOAD_SEARCHBOX_VALUE reducer called", action.payload);
      return {
        ...state,
        valueInSearchBox: action.payload
      }

    case types.LOAD_ATTRIBUTES_SEARCHED:
      console.log("LOAD_SEARCHED_ATTRIBUTES called: ", action.payload);
      return {
        ...state,
        filteredAttributesData: action.payload,
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

export { attributeReducer };