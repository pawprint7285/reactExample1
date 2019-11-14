import { editRangeReducer } from "./reducers";
export * from "./actions";

// if there are multiple reducers functions in reducers
// use combineReducer here to structure and creats the state shape
// for example
/* 
  const courseReducer = combineReducers({
    coursesA,
    coursesB,
    coursesC
  });
*/

export default editRangeReducer;
