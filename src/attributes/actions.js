import { LOAD_ATTRIBUTES, LOAD_SEARCHBOX_VALUE_ATTRIBUTES, LOAD_ATTRIBUTES_SEARCHED, CHECKBOX_VALUE_CHANGE } from './actionTypes';

export const getAttributes = () => dispatch => {
    // console.log("categories called", dispatch)
    var fileData = require('../Attributes.json')
    // console.log("file Data: ", fileData)
    dispatch({
        type: LOAD_ATTRIBUTES,
        payload: fileData
    })
};

export const getSearched = (searchedValue) => dispatch => {
    console.log("getSearchedAttributes called attributes...", searchedValue);
    var fileData = require('../Attributes.json');
    if (searchedValue) {
        var filteredData = fileData.filter(item => item.Name.toLowerCase().match(searchedValue.toLowerCase()));
        console.log("attributes: ", filteredData);
        dispatch({
            type: LOAD_ATTRIBUTES_SEARCHED,
            payload: filteredData
        })
    }
    // else {
    //     dispatch({
    //         type: LOAD_SEARCHED_ATTRIBUTES,
    //         payload: [],
    //         searchedValue: searchedValue
    //     })
    // }
}

export const getSearchedAttributes = (searchedValue) => dispatch => {
    console.log("getSearchedAttributes called attributes...", searchedValue);
    var fileData = require('../Attributes.json');
    if (searchedValue) {
        var filteredData = fileData.filter(item => item.Name.toLowerCase().match(searchedValue.toLowerCase()));
        console.log("attributes: ", filteredData);
        dispatch({
            type: LOAD_ATTRIBUTES_SEARCHED,
            payload: filteredData,
            searchedValue:searchedValue  
        })
    }
    // else {
    //     dispatch({
    //         type: LOAD_SEARCHED_ATTRIBUTES,
    //         payload: [],
    //         searchedValue: searchedValue
    //     })
    // }
}

export const getSearchBoxValueAttribute = (changedText) => dispatch => {
    console.log("search Box value changed...", changedText);
    dispatch({
        type: LOAD_SEARCHBOX_VALUE_ATTRIBUTES,
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