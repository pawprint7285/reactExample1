// import * as types from "./actionTypes";
import { LOAD_CATEGORY_OF_CATEGORIES, UPDATE_CATEGORY_CHNAGES, LOAD_CATEGORY_SUGGESTIONS } from "./actionTypes";
import initialState from "../app/initialState";

const categoryInfoReducer = (state = initialState.categoryInfo, action) => {    
    switch (action.type) {
        case LOAD_CATEGORY_OF_CATEGORIES:            
            return {
                ...state,
                categoryOfCategories: action.payload
            }

        case UPDATE_CATEGORY_CHNAGES:
            console.log("UPDATE_CATEGORY_CHNAGES called.........");
            return {
                ...state,
                categoryOfCategories: action.payload
            }

        case LOAD_CATEGORY_SUGGESTIONS:
            return {
                ...state,
                categoriesForSuggestion: action.payload
            }

        default:
            return state;
    }
};

export { categoryInfoReducer };