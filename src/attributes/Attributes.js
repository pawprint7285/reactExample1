import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getAttributes, getSearchBoxValueAttribute, getSearchedAttributes } from './actions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PropTypes from "prop-types";
import './attributes.scss'

class Attributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //stores the text which is searched
            searchedText: ''
        };
    }

    componentDidMount() {
        console.log("componentDidMount called...");
        //gets the dummy data from json file
        //dispatches action which gets all the categories
        this.props.getSearchedAttributes('');
    }

    componentWillReceiveProps(recievedProps) {
        console.log("componentWillReceiveProps called...", recievedProps)
        console.log("recievedProps: ", recievedProps);
        this.setState({
            //gets the value searched from the store as props
            value: recievedProps.valueInSearchBox
        })
        this.props.getSearchedAttributes('');
    }

    handleTextInputChange = value => {
        console.log("change: ", value.target.value);
        //checks that the value entered is not null or undefined
        if (value != "" || value != undefined) {
            this.setState({ searchedText: value.target.value });
        }
        else {
            this.setState({ searchedText: '' })
            this.props.getSearchedAttributes('');
        }
    };

    onSearch = () => {
        console.log("Searched text: ", this.state.searchedText);

        this.props.getSearchedAttributes(this.state.searchedText);

    }

    render() {
        //destructured the values in state
        const { searchedText } = this.state;
        //destructured the values in props
        const { filteredAttributesData, valueInSearchBox } = this.props;
        console.log("a: ", valueInSearchBox);

        //filteredCategoryData will recieve an array of data, the can either have some values or it can be null, so we need to check the length of array
        if (filteredAttributesData.length > 0) {
            console.log(filteredAttributesData.length)
            var renderCards = filteredAttributesData.map((item, o) => (
                <Link to={item.Class == "range" ? "/range/" + item.ID : "/attribute/" + item.ID} key={o}>
                    {/* card component of prime react    */}
                    <Card
                        title={item.Name}
                        style={{ width: '150px', color: 'white', float: 'left' }}
                        key={o}
                        id={"card-" + o}
                        className={item.Class == "range" ? "rangeCard" : "categoryCard"}
                    >
                        <div>{item.Class}</div>
                    </Card>
                </Link>
            ))
        }
        return (
            <>
                <div>
                    <div>
                        <div className="searchInputs">
                            <h2> Attributes </h2>
                            {/* InputText component of prime react */}
                            <InputText value={searchedText} onChange={this.handleTextInputChange} placeholder="Search..." />
                            {/* Button comopnent of prime react */}
                            <Button label="Go" className="p-button-secondary" onClick={this.onSearch} />
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
                                <h5>Search for attribute</h5>
                                : renderCards && valueInSearchBox ?
                                    renderCards
                                    : <h5>Searched attribute not found</h5>
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    valueInSearchBox: state.attributeReducer.valueInSearchBox ? state.attributeReducer.valueInSearchBox : '',
    filteredAttributesData: state.attributeReducer.filteredAttributesData ? state.attributeReducer.filteredAttributesData : []
})

// Category.propTypes = {
//     filteredCategoryData: PropTypes.array,
//     valueInSearchBox: PropTypes.string,
//     // checkBoxValueID: PropTypes.object,
//     getCategories: PropTypes.func,
//     // getSearchBoxValue: PropTypes.func,
//     getSearchedCategories: PropTypes.func
// };

export default connect(mapStateToProps, { getAttributes, getSearchBoxValueAttribute, getSearchedAttributes })(Attributes);
