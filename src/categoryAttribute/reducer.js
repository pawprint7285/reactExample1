import { GET_ATTRIBUTES, DELETE_ATTRIBUTES, LOAD_SEARCHED_ATTRIBUTES } from "./actionTypes";
import initialState from "../app/initialState";

const categoryAttributesReducer = (state = initialState.attributes, action) => {
    console.log(action);
    switch (action.type) {
        case GET_ATTRIBUTES:
            console.log("reducer LOAD_CATEGORY: ", action.payload)
            return {
                ...state,
                allAttributes: action.payload
            }

        case DELETE_ATTRIBUTES:
            console.log("reducer DELETE_ATTRIBUTE: ", action.payload)
            return {
                ...state,
                allAttributes: action.payload
            }

        case LOAD_SEARCHED_ATTRIBUTES:
            console.log("reducer LOAD_CATEGORY: ", action.payload)
            return {
                ...state,
                allAttributes: action.payload
            }

        default:
            return state;
    }
};

export { categoryAttributesReducer };