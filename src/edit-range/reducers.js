import * as types from "./actionTypes";
import initialState from "../app/initialState";

const editRangeReducer = (state = initialState.editRange, action) => {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      // only to update already existed couse by matching the pass in
      // action course id and update it, others stay the same
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
    default:
      return state;
  }
};

// const courseA = (state = initialState.courses, action) => {};

// const courseB = (state = initialState.courses, action) => {};

// const courseC = (state = initialState.courses, action) => {};

export { editRangeReducer };

// export { courseA, courseB, courseC };
