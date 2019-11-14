import { LOAD_CATEGORY, LOAD_SEARCHBOX_VALUE, CHECKBOX_VALUE_CHANGE, LOAD_SEARCHED_CATEGORY } from "./actionTypes";

export const getCategories = () => dispatch => {
    // console.log("categories called", dispatch)
    var fileData = require('../Data.json')
    // console.log("file Data: ", fileData)
    dispatch({
        type: LOAD_CATEGORY,
        payload: fileData
    })
};

export const getSearchedCategories = (searchedValue) => dispatch => {
    console.log("getSearchedCategories called...", searchedValue);
    var fileData = require('../Data.json');
    if (searchedValue) {
        var filteredData = fileData.filter(item => item.Label.toLowerCase().match(searchedValue.toLowerCase()));
        console.log("filtered data: ", filteredData);
        dispatch({
            type: LOAD_SEARCHED_CATEGORY,
            payload: filteredData,
            searchedValue:searchedValue  
        })
    }
    else {
        dispatch({
            type: LOAD_SEARCHED_CATEGORY,
            payload: [],
            searchedValue:searchedValue
        })
    }
}

export const getSearchBoxValue = (changedText) => dispatch => {
    console.log("search Box value changed...", changedText);
    dispatch({
        type: LOAD_SEARCHBOX_VALUE,
        payload: changedText
    })
}

export const getCheckboxChangedValue = (id, value) => dispatch => {
    console.log("getCheckboxChangedValue called...", id, value);
    dispatch({
        type: CHECKBOX_VALUE_CHANGE,
        payload: { value: value, id: id }
    })
}