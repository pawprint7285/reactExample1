import React, { Component } from 'react';
import "./category.scss";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getSearchBoxValue, getSearchedCategories } from './actions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PropTypes from "prop-types";

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //stores the text which is searched
            searchedText: ''
        };
    }

    componentDidMount() {
        // console.log("componentDidMount called...");        
        this.props.getSearchedCategories('');
    }

    componentWillReceiveProps(recievedProps) {
        // console.log("componentWillReceiveProps called...", recievedProps)
        // console.log("recievedProps: ", recievedProps);
        this.setState({
            //gets the value searched from the store as props
            value: recievedProps.valueInSearchBox,
        })
    }

    handleTextInputChange = value => {
        // console.log("change: ", value.target.value);
        //checks that the value entered is not null or undefined
        if (value != "" || value != undefined) {
            this.setState({ searchedText: value.target.value });
        }
        else {
            this.setState({ searchedText: '' })
            this.props.getSearchedCategories('');
        }
    };

    // onSearch = () => {
    //     // console.log("Searched text: ", this.state.searchedText);     

    //     //gets the dummy data from json file
    //     //dispatches action which gets all the categories
    //     this.props.getSearchedCategories(this.state.searchedText);
    // }

    render() {
        //destructured the values in state
        const { searchedText } = this.state;
        //destructured the values in props
        const { filteredCategoryData, valueInSearchBox } = this.props;
        // console.log("a: ", filteredCategoryData);

        //filteredCategoryData will recieve an array of data, the can either have some values or it can be null, so we need to check the length of array
        if (filteredCategoryData.length > 0) {
            var renderCards = filteredCategoryData.map((item, o) => (
                //card component of prime react
                <Link to={'/Category-info/' + item.CategoryId} key={o}>
                    <Card
                        title={item.Label}
                        style={{ width: '150px', color: 'white', float: 'left' }}
                        key={o}
                        id={"category-" + o}
                        className={item.Type == "LLC" ? "ui-card-shadow Category-Card-LLC" : "ui-card-shadow Category-Card"}>
                        {/* <div>{item.Label}</div> */}
                    </Card>
                </Link>
            ))
        }
        return (
            <>
                <div>
                    <div>
                        <div className="searchInputs"> 
                        <h2> Categories  </h2>
                            {/* InputText component of prime react */}
                            <InputText value={searchedText} onChange={this.handleTextInputChange} placeholder="Search..." />
                            {/* Button comopnent of prime react */}
                            <Button label="Go" className="p-button-secondary" onClick={() => this.props.getSearchedCategories(this.state.searchedText)} />
                        </div>
                        <div className="checkBoxFilters">
                            <div className="p-grid">
                                <label htmlFor="cb1" className="p-checkbox-label">Types: </label>
                                {/* checkbox comopnent of prime react */}
                                <Checkbox inputId="cb1" value="New York" ></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label">Departments </label>

                                <Checkbox inputId="cb2" value="San Francisco" ></Checkbox>
                                <label htmlFor="cb2" className="p-checkbox-label">Orphan </label>

                                <Checkbox inputId="cb3" value="Los Angeles" ></Checkbox>
                                <label htmlFor="cb3" className="p-checkbox-label">Retired </label>
                            </div>
                            <div className="p-grid">
                                <label htmlFor="cb1" className="p-checkbox-label">Status: </label>

                                <Checkbox inputId="cb1" value="New York" ></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label">Active </label>

                                <Checkbox inputId="cb2" value="San Francisco" ></Checkbox>
                                <label htmlFor="cb2" className="p-checkbox-label">Deactivated </label>

                                <Checkbox inputId="cb3" value="Los Angeles" ></Checkbox>
                                <label htmlFor="cb3" className="p-checkbox-label">Deleted </label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {/* this section renders the cards, if array has any data in it */}
                        {
                            !renderCards && !valueInSearchBox ?
                                <h5>Search for category</h5>
                                : renderCards && valueInSearchBox ?
                                    renderCards
                                    : <h5>Searched category not found</h5>
                        }
                    </div>
                </div>
            </>
        )
    }
}

// pure function that returns the plain object, that will be recieved as props by the component when the store updates
// const mapStateToProps = (state, ownProps ) => {
//     console.log(state,state.categoryReducer) // state
//     //console.log(ownProps) // {}
//     return {
//         allCategories: state.categoryReducer.allCategories,
//         valueInSearchBox: state.categoryReducer.valueInSearchBox ? state.categoryReducer.valueInSearchBox : '',
//         filteredCategoryData: state.categoryReducer.filteredCategoryData ? state.categoryReducer.filteredCategoryData : []
//     }
//   }

const mapStateToProps = (state) => ({
    valueInSearchBox: state.categoryReducer.valueInSearchBox ? state.categoryReducer.valueInSearchBox : '',
    // checkBoxValueID: state.categoryReducer.valueCheckedID,
    // valueChecked: state.categoryReducer.valueChecked,
    filteredCategoryData: state.categoryReducer.filteredCategoryData ? state.categoryReducer.filteredCategoryData : []
})

Category.propTypes = {
    getSearchBoxValue: PropTypes.func,
    getSearchedCategories: PropTypes.func
};

export default connect(mapStateToProps, { getSearchBoxValue, getSearchedCategories })(Category);