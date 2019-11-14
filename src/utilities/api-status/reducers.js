import * as types from "./actionTypes";
import initialState from "../../app/initialState";

const actionTypeEndsInSuccess = type => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

const apiCallsStatusReducer = (state = initialState.apiCallsStatus, action) => {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  } else {
    return state;
  }
};

export { apiCallsStatusReducer };
