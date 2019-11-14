import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "./index";
import { loadAuthors } from "../lookup/authors";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
// import { newCourse } from "../../../tools/mockData";
import Spinner from "../utilities/spinner/Spinner";
import { toast } from "react-toastify";

function ManageCourseContainer({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
  /*
    expose/connect the component own state course to redux props ...props
  */
  // the ...props is still the redux props, and the single item course
  // is just via the reselect approach, which is used to pass in the
  // useState and set as component own state
}) {
  // pass in the reselected course from redux courses and
  // set it as component own state is a good design, because
  // we don't need to use the redux state as a whole
  // we can stil use component own state for that
  // part of the related form submission
  /*
    expose/connect the component own state course to redux props ...props
  */
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);
  /*
    expose/connect the component own state course to redux props ...props
  */
  // need to set the second param in useEffect
  // and use setCourse again to load the reselected redux state course
  // for component own state course when evey time the component mounts

  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      // this is a smart way to hanldeChange, especially use
      // the [name] property key as variable, which enables using
      // several fields in only one handleChange function
      // and make it consistent
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCourseContainer.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const getCourseBySlug = (courses, slug) => {
  return courses.find(course => course.slug === slug) || null;
};

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

// the ownProps does not include course,
const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  // the cours is via the reselect redux state approach
  // which is to reselect from the courses and set to
  // single course item
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  // debugger;
  /*
    expose/connect the component own state course to redux props ...props
    now use the redux state courses and reselect the course
    to pass the course to component own state
  */
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCourseContainer);

export { ManageCourseContainer };
