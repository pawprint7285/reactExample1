export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_ASSOCIATE_SUCCESS = "LOAD_ASSOCIATE_SUCCESS";
export const LOAD_CATEGORIES_SUCCESS = "LOAD_CATEGORIES_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const SEARCH_CATEGORIES_FILTER = "SEARCH_CATEGORIES_FILTER";

export const SEARCH_CATEGORY_SUCCESS = "SEARCH_CATEGORY_SUCCESS";
export const DELETE_ASSOCIATE_OPTIMISTIC = "DELETE_ASSOCIATE_OPTIMISTIC";
export const ADD_ASSOCIATE_CATEGORY = "ADD_ASSOCIATE_CATEGORY";
// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";
