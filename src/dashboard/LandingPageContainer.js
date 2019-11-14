import React from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";

class LandingPageContainer extends React.Component {
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
      <div className="just-a-tag-2">
        <Dashboard />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(LandingPageContainer);
