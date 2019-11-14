import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import Catalogs from "./Catalogs";
import Attributes from "../attributes/Attributes";
import CoursesContainer from "../courses/CoursesContainer";
//eslint-disable-next-line import/no-named-as-default
import ManageCourseContainer from "../course/ManageCourseContainer";
import ForTestingPurpose from "../try/ForTestingPurpose";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Catalogs} />
          {/* <Route path="/products" component={CatalogsContainer} /> */}
          <Route path="/attributes" component={Attributes} />
          <Route path="/courses" component={CoursesContainer} />
          <Route path="/course/:slug" component={ManageCourseContainer} />
          <Route path="/course" component={ManageCourseContainer} />
          <Route path="/test-and-practice" component={ForTestingPurpose} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  isDropdownOpen: PropTypes.bool,
  activeItem: PropTypes.number,
  onDropdownToggle: PropTypes.func.isRequired,
  onDropdownSelect: PropTypes.func.isRequired,
  onNavSelect: PropTypes.func.isRequired
};

export default Home;
