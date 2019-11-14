import React from "react";
import { Route, Switch } from "react-router-dom";
import Catalogs from "../home/Catalogs";
import Attributes from "../attributes/Attributes";
import CoursesContainer from "../courses/CoursesContainer";
//eslint-disable-next-line import/no-named-as-default
import ManageCourseContainer from "../course/ManageCourseContainer";
import ForTestingPurpose from "../try/ForTestingPurpose";
import PageNotFound from "../home/PageNotFound";
import Category from "../category/Category";
import CategoryInfo from "../categoryInfo/CategoryInfo";
import CategoryAttribute from "../categoryAttribute/CategoryAttribute";
import EditRangeContainer from "../edit-range/EditRangeContainer";
import EditAttributeContainer from "../edit-attribute/EditAttributeContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Category} />
          <Route path="/attributes" component={Attributes} />
          <Route path="/courses" component={CoursesContainer} />
          <Route path="/course" component={ManageCourseContainer} />
          <Route path="/course/:slug" component={ManageCourseContainer} />
          <Route path="/test-and-practice" component={ForTestingPurpose} />
          <Route path="/categories" component={Catalogs} />
          <Route path="/category-info/:id" component={CategoryInfo} />
          <Route path="/category-attribute-edit" component={CategoryAttribute} />
          <Route path="/range" component={EditRangeContainer} />
          <Route path="/range/:rangeId" component={EditRangeContainer} />
          <Route path="/attribute" component={EditAttributeContainer} />
          <Route path="/attribute/:attrId" component={EditAttributeContainer} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </React.Fragment>
    );
  }
}

export default Main;
