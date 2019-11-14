import * as types from "./actionTypes";
// import * as courseApi from "./courseApi";
import { beginApiCall, apiCallError } from "../utilities/api-status";

const createCourse = course => {
  return { type: types.CREATE_COURSE, course };
};

const loadCourseSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};

const loadCourses = () => dispatch => {
  dispatch(beginApiCall());
  //   return courseApi
  //     .getCourses()
  //     .then(courses => {
  //       dispatch(loadCourseSuccess(courses));
  //     })
  //     .catch(error => {
  //       dispatch(apiCallError(error));
  //       throw error;
  //     });
};

const createCourseSuccess = course => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
};

const updateCourseSuccess = course => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
};

// the getState can fetch the other redux state for some usages
//eslint-disable-next-line no-unused-vars
const saveCourse = course => (dispatch, getState) => {
  dispatch(beginApiCall());
  //eslint-disable-next-line no-unused-vars
  //   return courseApi
  //     .saveCourse(course)
  //     .then(savedCourse => {
  //       // if the cousre is already existed, it has an id
  //       // so update it with PUT, otherwise by the Add Course
  //       // course in CourseContainer, it uses newCourse obj
  //       // in mockData which is without Id and POST it
  //       course.id
  //         ? dispatch(updateCourseSuccess(savedCourse))
  //         : dispatch(createCourseSuccess(savedCourse));
  //     })
  //     .catch(error => {
  //       dispatch(apiCallError(error));
  //       throw error;
  //     });
};

const deleteCourseOptimistic = course => {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
};

const deleteCourse = course => {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    // return courseApi.deleteCourse(course.id);
  };
};

export {
  createCourse,
  loadCourses,
  saveCourse,
  deleteCourse,
  createCourseSuccess, //this export is for couses action and store test
  updateCourseSuccess //this export is for courses reducer test
};
