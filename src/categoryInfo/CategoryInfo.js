import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { connect } from "react-redux";
import { getCategoryOfCategories, onSavingChanges, getCategoriesForSuggestion } from './actions';

import { Messages } from 'primereact/messages';

import "./categoryInfo.scss";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

/**Saves the copy of data so that it can be compared with the modified */
var oldData = {};

class CategoryInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**copy of the the category object stored */
            dataForModification: {},
            /**checks for modifications if any */
            isDataModified: false,
            /**value entered in autosuggestion textbox */
            autoSuggestionFieldValue: "",
            /**auto suggested category data */
            filteredCategories: null
        }
    }

    componentDidMount() {
        // console.log("Category info componentDidMount: ", this.props);
        //dispatches action which gets the category which is clicked in the previous view        
        this.props.getCategoryOfCategories(this.props.match.params.id);
        //gets all the categories for auto suggestion from the json file
        this.props.getCategoriesForSuggestion();
        const copyOld = JSON.stringify(this.props.categoryOfCategories);
        const copyOfCategoryOfCategories = JSON.parse(copyOld)

        this.setState({
            dataForModification: copyOfCategoryOfCategories
        })
        oldData = JSON.parse(copyOld);
    }

    UNSAFE_componentWillReceiveProps(rProps) {
        // console.log("++++++++", rProps);
        const copyOld = JSON.stringify(rProps.categoryOfCategories);
        const copyOfCategoryOfCategories = JSON.parse(copyOld)

        this.setState({
            dataForModification: copyOfCategoryOfCategories
        })
        oldData = JSON.parse(copyOld);

        if (this.props.match.params.id != rProps.match.params.id) {
            //called when we click on the categoryID in the parents accordion
            this.props.getCategoryOfCategories(rProps.match.params.id);
        }
    }

    /**handles changes in the textfields */
    //TODO: validation (required fields)
    handleInputChange = (e) => {
        let fields = this.state.dataForModification;
        fields[e.target.name] = e.target.value;
        this.setState({
            dataForModification: fields
        });
        this.detechChange(oldData, this.state.dataForModification);
    }

    /**compares the oldData of the component and the modified data */
    detechChange = (oldValue, newValue) => {
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            this.setState({
                isDataModified: true
            })
        }
        else {
            this.setState({
                isDataModified: false
            })
        }
    }

    /** renders accordion*/
    renderAccordion = (parents, type, CategoryId, children) => {
        if (type == "LLC") {
            return <Accordion>
                <AccordionTab header="Parents">
                    <div>
                        {console.log(this.state.dataForModification.Parents.length >= 0)}
                        {this.state.dataForModification.Parents.length > 0 ?
                            < Button onClick={this.onRemovingParent} icon="pi pi-minus" className="removeParentButton" /> : null}
                        <table className="parentTable">
                            <tbody>
                                {this.renderParentsInAccordion(parents, CategoryId)}
                                {this.state.dataForModification.addedParents && this.renderAddedParent(this.state.dataForModification.addedParents)}
                            </tbody>
                        </table>
                        <Button onClick={this.onAddingParent} icon="pi pi-plus" className="addParentButton" />
                    </div>
                </AccordionTab>
            </Accordion>
        }
        else {
            return <Accordion>
                <AccordionTab header="Parents">
                    <div>
                        {console.log(this.state.dataForModification.Parents.length)}
                        {this.state.dataForModification.Parents.length > 0 ?
                            < Button onClick={this.onRemovingParent} icon="pi pi-minus" className="removeParentButton" /> : null}
                        <table className="parentTable">
                            <tbody>
                                {this.renderParentsInAccordion(parents)}
                                {this.state.dataForModification.addedParents && this.renderAddedParent(this.state.dataForModification.addedParents)}
                            </tbody>
                        </table>
                        <Button onClick={this.onAddingParent} icon="pi pi-plus" className="addParentButton" />
                    </div>
                </AccordionTab>
                <AccordionTab header="Children">
                    <div>
                        {/* {this.state.dataForModification.Children.length > 0 ?
                            < Button onClick={this.onRemovingChildren} icon="pi pi-minus" className="removeParentButton" /> : null} */}
                        <table className="parentTable">
                            <tbody>
                                {this.renderChildrenInAccordion(children, CategoryId)}
                                {this.state.dataForModification.addedChildren && this.renderAddedChildren(this.state.dataForModification.addedChildren)}
                            </tbody>
                        </table>
                        <Button onClick={this.onAddingChildren} icon="pi pi-plus" className="addParentButton" />
                    </div>
                </AccordionTab>
            </Accordion>
        }
    }

    /**renders parents in the accordion */
    renderParentsInAccordion = (parents, CategoryId) => {
        return parents.map((i, o) => (
            <tr key={o}>
                <td>
                    <Link to={'/Category-info/' + i.CategoryId} key={o}>
                        {i.CategoryId}
                    </Link>
                </td>
                <td>
                    {i.Name}
                </td>
                <td>
                    {i.Label}
                </td>
                {/* <td>
                    {o == 0 ?
                        <Button onClick={() => this.onRemovingParent(i.CategoryId)} icon="pi pi-minus" />
                        : null} 
                </td> */}
            </tr>
        ))
    }

    /**renders the new added parents */
    renderAddedParent = (addedParent) => {
        return this.state.dataForModification.addedParents.map((i, o) => (
            <tr key={o}>
                <td>
                    <Link to={{ pathname: "/category-parent-details/" + i.CategoryId, state: { currentCategoryId: i.CategoryId } }}>
                        {i.CategoryId > -1 ? i.CategoryId : ""}
                    </Link>
                </td>
                <td>
                    <AutoComplete
                        id={"" + o + "'"}
                        value={i.Name}
                        suggestions={this.state.filteredCategories}
                        completeMethod={this.filterSuggestions}
                        size={30}
                        minLength={1}
                        placeholder="Enter Category Name"
                        dropdown={true}
                        itemTemplate={this.itemTemplate}
                        onChange={(e) => this.onSuggestionChange(o, e, "parent")}
                        onSelect={(e) => this.onSuggestionSelect(o, e, "parent")}
                    />
                </td>
                <td>
                    {i.Label}
                </td>
            </tr>
        ))
    }

    /**renders children in the accordion */
    renderChildrenInAccordion = (children, CategoryId) => {
        console.log("renderChildrenInAccordion: ", children);
        return children.map((i, o) => (
            <tr key={o}>
                <td>
                    <Link to={'/Category-info/' + i.CategoryId} key={o}>
                        {i.CategoryId}
                    </Link>
                </td>
                <td>
                    {i.Name}
                </td>
                <td>
                    {i.Label}
                </td>
                <td>
                    {o == 0 ?
                        <Button onClick={() => this.onRemovingChildren(i.CategoryId)} icon="pi pi-minus" />
                        : null}
                </td>
            </tr>
        ))
    }

    /**renders the new added parents */
    renderAddedChildren = (addedChildren) => {
        console.log("renderAddedChildren")
        return this.state.dataForModification.addedChildren.map((i, o) => (
            <tr key={o}>
                <td>
                    <Link to={{ pathname: "/category-parent-details/" + i.CategoryId, state: { currentCategoryId: i.CategoryId } }}>
                        {i.CategoryId > -1 ? i.CategoryId : ""}
                    </Link>
                </td>
                <td>
                    <AutoComplete
                        id={"" + o + "'"}
                        value={i.Name}
                        suggestions={this.state.filteredCategories}
                        completeMethod={this.filterSuggestions}
                        size={30}
                        minLength={1}
                        placeholder="Enter Category Name"
                        dropdown={true}
                        itemTemplate={this.itemTemplate}
                        onChange={(e) => this.onSuggestionChange(o, e, "children")}
                        onSelect={(e) => this.onSuggestionSelect(o, e, "children")}
                    />
                </td>
                <td>
                    {i.Label}
                </td>
            </tr>
        ))
    }

    /**called on change in value in the autosuggestion textbox */
    onSuggestionChange = (id, e, isParentorChild) => {
        var currentCategoryInfo = this.state.dataForModification;
        if (isParentorChild == "parent") {
            currentCategoryInfo.addedParents[id] = { Name: e.value, id: id }
        }
        else if (isParentorChild == "children") {
            currentCategoryInfo.addedChildren[id] = { Name: e.value, id: id }
        }
        this.setState({ dataForModification: currentCategoryInfo });
    }

    /**called on selecting any suggestion from the dropdown */
    onSuggestionSelect = (id, e, isParentorChild) => {
        var currentCategoryInfo = this.state.dataForModification;
        if (isParentorChild == "parent") {
            currentCategoryInfo.addedParents[id] = { CategoryId: e.value.CategoryId, Label: e.value.Label, Name: e.value.Name, id: id }
        }
        else if (isParentorChild == "children") {
            currentCategoryInfo.addedChildren[id] = { CategoryId: e.value.CategoryId, Label: e.value.Label, Name: e.value.Name, id: id }
        }
        this.setState({ dataForModification: currentCategoryInfo });
    }

    /**template for showing the items in the dropdown */
    itemTemplate = (category) => {
        return (
            <div className="p-clearfix">
                <div>
                    <span>{category.CategoryId + " "}</span>
                    <span>{category.Name}</span>
                </div>
            </div>
        );
    }

    /**filter the values for the suggestion as per the values are entered in the autosuggestion box */
    filterSuggestions = (event) => {
        // console.log("suggestion: ", this.props.categoriesForSuggestion);
        setTimeout(() => {
            let results;
            if (event.query.length === 0) {
                results = [...this.props.categoriesForSuggestion];
            }
            else {
                results = this.props.categoriesForSuggestion.filter((category) => {
                    return category.Name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.setState({ filteredCategories: results });
        }, 250);
    }

    /**called on click of + button, adds Parent */
    onAddingParent = () => {
        var newData = this.state.dataForModification;
        newData.addedParents = newData.addedParents ? newData.addedParents : [];

        var blankRowLength = newData.addedParents.filter(item => item.CategoryId == -1).length;
        if (blankRowLength == 0) {
            newData.addedParents.push({
                id: -1, CategoryId: "-1", Label: "", Name: ""
            })
        }
        else {
            alert("Please select value for added row.");
        }
        this.setState({
            dataForModification: newData
        })
        this.detechChange(oldData, this.state.dataForModification);
    }

    /**called on click of + button, adds Children */
    onAddingChildren = () => {
        // console.log("on Adding children");
        var newData = this.state.dataForModification;
        newData.addedChildren = newData.addedChildren ? newData.addedChildren : [];

        var blankRowLength = newData.addedChildren.filter(item => item.CategoryId == -1).length;
        if (blankRowLength == 0) {
            newData.addedChildren.push({
                id: -1, CategoryId: "-1", Label: "", Name: ""
            })
        }
        else {
            alert("Please select value for added row.");
        }
        this.setState({
            dataForModification: newData
        })
        this.detechChange(oldData, this.state.dataForModification);
    }

    /**called on click of "-"" button. Removes all parents in the array. */
    onRemovingParent = () => {
        var categoryData = this.state.dataForModification;
        var filteredParent = categoryData.Parents;
        console.log("filtered Parent: ", filteredParent);
        filteredParent.length = 0;
        this.setState({
            dataForModification: categoryData
        })
        this.detechChange(oldData, this.state.dataForModification);
    }

    /**called on click of "-"" button. Changed: Removes one children at a time. */
    onRemovingChildren = (categoryId) => {
        var categoryData = this.state.dataForModification;
        var filteredChildren = categoryData.Children.filter(item => item.CategoryId == categoryId);
        var indexOfImage = filteredChildren.indexOf(filteredChildren);
        categoryData.Children.splice(indexOfImage + 1, 1)
        this.setState({
            dataForModification: categoryData
        })
        this.detechChange(oldData, this.state.dataForModification);
    }

    /** saves the changes if there are any modifications*/
    onSaveClick = () => {
        var showMessage = false;
        console.log("...........", this.state.dataForModification);
        var objectReceived = this.state.dataForModification;
        for (var i in objectReceived) {
            console.log(i + " " + objectReceived[i]);
            var child = objectReceived[i];
            console.log("i: ", i);
            if (child === null || child == "") {
                if (i == "Parents" || i == "Children") {
                    showMessage = false;
                }
                else {
                    showMessage = true;
                    break;
                }
            }
            else {
                showMessage = false;
            }
        }
        if (showMessage) {
            this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
        }
        else {
            this.props.onSavingChanges(this.state.dataForModification);
            alert("Saved Changes");
        }
    }

    render() {
        // console.log("children's data: ", this.state.dataForModification);
        const { Type, Name, Status, CategoryId, Modified, Parents, Children } = this.state.dataForModification
            ? this.state.dataForModification :
            { Type: "", Name: "", Status: "", CategoryId: 0, Modified: "", Parents: [], Children: [] };
        return (
            <>
                <div>
                    <Messages ref={(el) => this.messages = el} />

                    <table className="categoryDetailsTable">
                        <tbody>
                            <tr>
                                <td><Button label="Item Summary" /></td>
                                <td></td>
                                <td>
                                    <label>
                                        <b>Cateory Type: * </b>
                                    </label>
                                </td>
                                <td>
                                    <InputText
                                        name="Type"
                                        value={Type == "LLC" ? "Lowest Level Category" : "Cat of Cats"}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><b>Name: *</b>
                                    </label>

                                </td>
                                <td>
                                    <InputText
                                        name="Name"
                                        value={Name ? Name : ""}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                                <td>
                                    <label>
                                        <b>Status: *</b>
                                    </label>
                                </td>
                                <td>
                                    <InputText
                                        name="Status"
                                        value={Status ? Status : "Static Text"}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <b>ID: *</b>
                                    </label>
                                </td>
                                <td>
                                    <InputText
                                        name="CategoryId"
                                        value={CategoryId ? CategoryId : 0}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                                <td>
                                    <label>
                                        <b>Modified: *</b>
                                    </label>
                                </td>
                                <td>
                                    <InputText
                                        name="Modified"
                                        value={Modified ? Modified : "modified"}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />

                {(Parents || Children) && this.renderAccordion(Parents, Type, CategoryId, Children)}

                {Type == "LLC" ?
                    <div>
                        <Link to={{ pathname: "/category-attribute-edit", state: { currentCategoryID: CategoryId } }} >
                            <Button label="Attributes" />
                        </Link>
                    </div>
                    :
                    null
                }

                <br />
                {this.state.isDataModified &&
                    <div>
                        <Button label="Save" onClick={this.onSaveClick} type="Submit" />
                    </div>
                }

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    categoryOfCategories: state.categoryInfoReducer.categoryOfCategories ? state.categoryInfoReducer.categoryOfCategories : "",
    categoriesForSuggestion: state.categoryInfoReducer.categoriesForSuggestion ? state.categoryInfoReducer.categoriesForSuggestion : []
})

CategoryInfo.propTypes = {
    getCategoryOfCategories: PropTypes.func
}

export default connect(mapStateToProps, { getCategoryOfCategories, onSavingChanges, getCategoriesForSuggestion })(CategoryInfo);