import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { connect } from "react-redux";
import { getAttributes, deleteAttribute, getSearchedAttributes, reorderAttributes } from './actions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './categoryAttribute.scss';
import PropTypes from "prop-types";
import { Growl } from 'primereact/growl';
import { Link } from 'react-router-dom';

class CategoryAttribute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attributesData: []
        };
    }

    componentDidMount() {
        // console.log("CategoryAttribute componentDidMount: ", this.props)
        this.props.getAttributes(this.props.location.state.currentCategoryID);
    }

    componentWillReceiveProps(receivedProps) {
        console.log("componentWillReceiveProps called: ", receivedProps);

        const allAttributes = receivedProps.allAttributes;
        var strigifyVal = JSON.stringify(allAttributes);
        var Attributes = JSON.parse(strigifyVal);
        Attributes.map((i, o) => (
            i.oldPosition = o,
            i.newPosition = o
        ));
        this.setState({
            attributesData: Attributes
        })

    }

    handlePositionChange = (currentPosition, e) => {
        console.log('handlePositionChange called...', e, currentPosition);

        // if (isNaN(e.target.value) || e.target.value < 0) {
        //     // tempAttributesData[currentPosition].newPosition = tempAttributesData[currentPosition].newPosition;
        //     // this.setState({ attributesData: tempAttributesData });
        //     this.growl.show({ summary: 'Error Message', detail: 'Please enter Numbers only' });
        // }
        // else {
        var tempAttributesData = this.state.attributesData;
        console.log("tempAttributesData: ", tempAttributesData);
        tempAttributesData[currentPosition].newPosition = e.target.value;
        this.setState({ attributesData: tempAttributesData });
        // }
    }
    reorderAttributes(currentPosition, newPosition) {
        //TODo: validation
        this.props.reorderAttributes(currentPosition, newPosition, this.props.location.state.currentCategoryID);
    }

    renderAttributeFooter = (id, currentPosition, newPosition) => {
        // console.log("id: ", id);
        return <div>
            <InputText
                value={newPosition + ""}
                style={{ width: '25px' }}
                onChange={(e) => this.handlePositionChange(currentPosition, e)}
                onBlur={(e) => this.reorderAttributes(currentPosition, newPosition)}
            />
            {/* $(this).val($(this).val().replace(/[^0-9]/g, ''));" */}
            <i className="pi pi-times"
                onClick={
                    () =>
                        window.confirm("Are you sure you want to delete this attribute?")
                            ? this.props.deleteAttribute(id, this.props.location.state.currentCategoryID)
                            : this.props.deleteAttribute(0, 0)
                }
            ></i>
        </div>
    }

    renderAttributes = () => {
        // console.log(this.props.allAttributes);

        // this.state.attributesData.map((i, o) => (
        //     i.oldPosition = o,
        //     i.newPosition = o
        // ))
        return this.state.attributesData.map((i, o) => (
            <div key={o}>
                <Link to={i.Class == "range" ? "/range/" + i.ID : "/attribute/" + i.ID} key={o}>
                    <Card
                        title="Attribute"
                        style={{ width: '150px', color: 'white', float: 'left' }}
                        // className="ui-card-shadow category-attribute-card"
                        className={i.Class == "range" ? "rangeCard" : "categoryCard"}
                        key={o}
                        footer={this.renderAttributeFooter(i.ID, i.oldPosition, i.newPosition)}
                    >
                        <div>{i.Name}</div>
                    </Card>
                </Link>
            </div >
        ))
    }

    render() {
        // console.log("change: ", this.props.allAttributes);
        return (
            <>
                <Growl ref={(el) => this.growl = el} />
                <h1 draggable>
                    CategoryAttribute
                </h1>
                {/* InputText component of prime react */}
                <Button label="Add" style={{ width: '52px', marginLeft: '350px' }} />
                <hr />
                <div>
                    {this.renderAttributes()}
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    allAttributes: state.categoryAttributesReducer.allAttributes ? state.categoryAttributesReducer.allAttributes : []
})

CategoryAttribute.propTypes = {
    getAttributes: PropTypes.func.isRequired,
    deleteAttribute: PropTypes.func.isRequired,
    getSearchedAttributes: PropTypes.func.isRequired,
    reorderAttributes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getAttributes, deleteAttribute, getSearchedAttributes, reorderAttributes })(CategoryAttribute)