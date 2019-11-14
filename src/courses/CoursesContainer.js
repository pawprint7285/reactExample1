import React from "react";
import { connect } from "react-redux";
import * as courseActions from "./index";
import * as authorActions from "../lookup/authors";
import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../utilities/spinner/Spinner";
import { toast } from "react-toastify";

class CoursesContainer extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props;

    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  // the <> is React.Fragment syntax
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        {/* <h2>Products</h2> */}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <button
                style={{ marginBottom: 10 }}
                className="btn btn-primary add-course"
                onClick={() => this.setState({ redirectToAddCoursePage: true })}
              >
                Add Product
              </button>
            </div>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesContainer.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  // actions: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    // this is the reselect redux state approach, it's the same with the
    // ManageCourseContainer to reselect signle course item
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsStatus > 0
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  deleteCourse: courseActions.deleteCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesContainer);
