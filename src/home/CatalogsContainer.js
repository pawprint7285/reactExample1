import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
// import "./catalogs.scss";

class CatalogsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      activeItem: 0
    };
  }

  onDropdownToggle = isDropdownOpen => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId
    });
  };

  render() {
    return (
      <Home
        isDropdownOpen={this.state.isDropdownOpen}
        activeItem={this.state.activeItem}
        onDropdownToggle={this.onDropdownToggle}
        onDropdownSelect={this.onDropdownSelect}
        onNavSelect={this.onNavSelect}
      />
    );
  }
}

export default connect(
  null,
  null
)(CatalogsContainer);
