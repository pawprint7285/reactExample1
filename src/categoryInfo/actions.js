import { LOAD_CATEGORY_OF_CATEGORIES, UPDATE_CATEGORY_CHNAGES, LOAD_CATEGORY_SUGGESTIONS } from "./actionTypes";

export const getCategoryOfCategories = (clickedCategoryID) => dispatch => {
    var fileData = require('../Data.json');
    if (fileData.length > 0) {
        var clickedCategory = fileData.filter(item => item.CategoryId === clickedCategoryID);
        if (clickedCategory.length > 0) {
            dispatch({
                type: LOAD_CATEGORY_OF_CATEGORIES,
                payload: clickedCategory[0]
            })
        }
    }
}

export const onSavingChanges = (inputChanges) => dispatch => {
    console.log("onSavingChanges`````````````", inputChanges);
    // alert("Changes saved");
    var lengthOfAddedParents = inputChanges.addedParents ? inputChanges.addedParents.length : 0;
    if (lengthOfAddedParents >= 0) {
        inputChanges.Parents.push.apply(inputChanges.Parents, inputChanges.addedParents);
        // inputChanges.addedParents.pop(inputChanges.addedParents);
        inputChanges.addedParents = [];
        console.log("updated value::::>>", inputChanges);
    }
    localStorage.setItem("NewInput Values", JSON.stringify(inputChanges));

    dispatch({
        type: UPDATE_CATEGORY_CHNAGES,
        payload: inputChanges
    })
}

export const getCategoriesForSuggestion = () => dispatch => {
    var fileData = require('../Data.json')
    dispatch({
        type: LOAD_CATEGORY_SUGGESTIONS,
        payload: fileData
    })
};