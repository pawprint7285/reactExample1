import * as types from "./actionTypes";
import initialState from "../../app/initialState";

const authorsReducer = (state = initialState.authors, action) => {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
};

export { authorsReducer };
