import * as types from "./actionTypes";
import initialState from "../app/initialState";
import { combineReducers } from "redux";
import _ from "lodash";

// const editAttributeReducer = (state = initialState.editAttribute, action) => {
//   switch (action.type) {
//     case types.LOAD_ASSOCIATE_SUCCESS:
//       return { ...state, associateCategories: action.associate };
//     case types.LOAD_CATEGORIES_SUCCESS:
//       return { ...state, allCategories: action.categories };
//     case types.CREATE_COURSE_SUCCESS:
//       return { ...state, attributeHeader: action.associate };
//     case types.UPDATE_COURSE_SUCCESS:
//       // only to update already existed couse by matching the pass in
//       // action course id and update it, others stay the same
//       return state.map(course =>
//         course.id === action.course.id ? action.course : course
//       );
//     case types.SEARCH_CATEGORIES_FILTER:
//       // only to update already existed couse by matching the pass in
//       // action course id and update it, others stay the same
//       console.log("categories name searh string: " + action.strCatName);
//       console.log(
//         "test redux copy state: " +
//           _.clone(state.allCategories).filter(cat => cat.name === "Heat Pumps")
//       );
//       tempStateOp(
//         _.clone(state),
//         _.clone(state.allCategories),
//         action.strCatName
//       );

//       return state;
//     case types.DELETE_COURSE_OPTIMISTIC:
//       return state.filter(course => course.id !== action.course.id);
//     default:
//       return state;
//   }
// };

// const courseA = (state = initialState.courses, action) => {};

// const tempStateOp = (tempState, opState, str) => {
//   console.log("tempState: " + tempState.allCategories);
//   console.log("opState: " + opState.filter(cat => cat.name === "Heat Pumps"));
//   const temp = tempState;
//   temp.allCategories = opState;
//   return temp;
// };

// const courseB = (state = initialState.courses, action) => {};

const attributeHeader = (
  state = initialState.editAttribute.attributeHeader,
  action
) => {
  return state;
};

const associateCategories = (
  state = initialState.editAttribute.associateCategories,
  action
) => {
  switch (action.type) {
    case types.LOAD_ASSOCIATE_SUCCESS:
      return [...state, ...action.associate];

    case types.DELETE_ASSOCIATE_OPTIMISTIC:
      return state.filter((item, index) => index !== action.assIndex);

    case types.ADD_ASSOCIATE_CATEGORY:
      console.log("the added category: " + action.category.name);
      return addCatOp(_.clone(state), action.category);

    default:
      return state;
  }
};

const addCatOp = (originAttr, addedCat) => {
  if (addedCat === null || addedCat === undefined) {
    return originAttr;
  } else {
    let catItem = [];
    catItem.push(addedCat);
    let result = [...originAttr, ...catItem];
    return result;
  }
};

const allCategories = (
  state = initialState.editAttribute.allCategories,
  action
) => {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return [...state, ...action.categories];

    case types.SEARCH_CATEGORIES_FILTER:
      // only to update already existed couse by matching the pass in
      // action course id and update it, others stay the same
      console.log("categories name searh string: " + action.strCatName);
      console.log(
        "test redux copy state: " +
          _.clone(state).filter(cat => cat.name === "Heat Pumps")
      );
      // tempStateOp(
      //   _.clone(state),
      //   _.clone(state.allCategories),
      //   action.strCatName
      // );
      // filterOp(_.clone(state), action.strCatName);
      // return action.strCatName
      //   ? state.filter(cat => cat.name === action.strCatName)
      //   : state;

      return filterOp(_.clone(state), action.strCatName);

    case types.SEARCH_CATEGORY_SUCCESS:
      // only to update already existed couse by matching the pass in
      // action course id and update it, others stay the same
      // console.log("categories name searh string: " + action.strCatName);
      // console.log(
      //   "test redux copy state: " +
      //     _.clone(state).filter(cat => cat.name === "Heat Pumps")
      // );
      // tempStateOp(
      //   _.clone(state),
      //   _.clone(state.allCategories),
      //   action.strCatName
      // );
      // filterOp(_.clone(state), action.strCatName);
      // return action.strCatName
      //   ? state.filter(cat => cat.name === action.strCatName)
      //   : state;

      return [...state, ...action.categories];

    default:
      return state;
  }
};

const filterOp = (originState, searchStr) => {
  if (searchStr !== "" && searchStr !== undefined && searchStr !== null) {
    return originState.filter(cat => cat.name === searchStr);
  } else {
    return originState;
  }
};

// const courseC = (state = initialState.courses, action) => {};

const editAttributeReducer = combineReducers({
  attributeHeader,
  associateCategories,
  allCategories
});

export { editAttributeReducer };

// export { courseA, courseB, courseC };
