import { GET_ATTRIBUTES, DELETE_ATTRIBUTES, LOAD_SEARCHED_ATTRIBUTES } from './actionTypes';

export const getAttributes = (categoryID) => dispatch => {
    console.log("getAttributes called", categoryID)
    var fileData = require('../Data.json')
    var currentCategory = fileData.filter(i => i.CategoryId == categoryID)[0]
    if (currentCategory.length > 0) {
        currentCategory = currentCategory[0];
    }

    console.log(currentCategory.Attributes);
    localStorage.setItem("UserData", JSON.stringify(currentCategory.Attributes));
    dispatch({
        type: GET_ATTRIBUTES,
        payload: currentCategory.Attributes
    })
};


export const deleteAttribute = (id, categoryID) => dispatch => {
    var fileData = require('../Data.json');
    var currentCategory = fileData.filter(i => i.CategoryId == categoryID)
    if (currentCategory.length > 0) {
        currentCategory = currentCategory[0];
        var attributesData = currentCategory.Attributes.filter(j => j.ID != id);
        dispatch({
            type: DELETE_ATTRIBUTES,
            payload: attributesData
        })
    }
}

export const getSearchedAttributes = (searchedValue, categoryID) => dispatch => {
    console.log("getSearchedCategories called...", searchedValue, categoryID);
    var fileData = require('../Data.json');
    var currentCategory;
    if (searchedValue != "" || searchedValue != undefined && categoryID != 0) {
        currentCategory = fileData.filter(i => i.CategoryId == categoryID)[0]
        console.log("currentCategory: ", currentCategory)

        var filteredData = currentCategory.Attributes.filter(item => item.Name.toLowerCase().match(searchedValue.toLowerCase()));
        console.log("filtered data: ", filteredData);
        dispatch({
            type: LOAD_SEARCHED_ATTRIBUTES,
            payload: filteredData,
        })
    }
}

export const reorderAttributes = (dragIndex, hoverIndex, categoryID) => dispatch => {
    var initialRows = [], Attributes = [];
    dragIndex = parseInt(dragIndex);
    hoverIndex = parseInt(hoverIndex);
    console.log("dragIndex = " + dragIndex, "hoverIndex = " + hoverIndex)
    if (localStorage.hasOwnProperty("UserData")) {

        const userJson = localStorage.getItem('UserData');
        initialRows = userJson !== null ? JSON.parse(userJson) : [];
    } else {
        var fileData = require('../Data.json')
        var currentCategory = fileData.filter(i => i.CategoryId == categoryID)[0]
        if (currentCategory.length > 0) {
            currentCategory = currentCategory[0];
        }

        localStorage.setItem("UserData", JSON.stringify(currentCategory));
        initialRows = currentCategory;
    }
    console.log(initialRows);
    initialRows.map((item, index) => {
        if (index != dragIndex) {
            if ((dragIndex < hoverIndex && (index - 1) == hoverIndex) || (dragIndex > hoverIndex && index == hoverIndex)) {
                Attributes.push(initialRows[dragIndex]);
            }
            Attributes.push(item);
        }
    })

    localStorage.setItem("UserData", JSON.stringify(Attributes));
    dispatch({
        type: GET_ATTRIBUTES,
        payload: Attributes
    })
};