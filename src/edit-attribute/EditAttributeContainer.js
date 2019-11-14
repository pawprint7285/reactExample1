import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadAssociate,
  loadCategories,
  searchCategoriesFilter,
  deleteAssociateOptimistic,
  addCategoryToAttribute
} from "./index";
import { loadAuthors } from "../lookup/authors";
import PropTypes from "prop-types";
// import CourseForm from "./CourseForm";
// import { newCourse } from "../../../tools/mockData";
import Spinner from "../utilities/spinner/Spinner";
// import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import AttributeHeaderInfo from "./AttributeHeaderInfo";
import AttributeMainEdit from "./AttributeMainEdit";

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

function EditAttributeContainer({
  courses,
  authors,
  loadAssociate,
  loadCategories,
  saveCourse,
  associate,
  categories,
  loading,
  // attribute,
  searchCategoriesFilter,
  deleteAssociateOptimistic,
  addCategoryToAttribute,
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

  const classes = useStyles();

  const [attribute, setAttribute] = React.useState({ ...props.attribute });

  // const [associate, setAssociate] = React.useState({ ...props.associate });

  // if (associate !== undefined && !loading) {
  //   console.log("test load associate 1: " + associate);
  // }

  // if (categories !== undefined && !loading) {
  //   console.log("test load categories 1: " + categories);
  // }

  const handleChange = event => {
    const { name, value } = event.target;
    setAttribute(prevAttibute => ({
      ...prevAttibute,
      // this is a smart way to hanldeChange, especially use
      // the [name] property key as variable, which enables using
      // several fields in only one handleChange function
      // and make it consistent
      [name]: name === "leftNavUse" ? !value : value
    }));
  };

  useEffect(() => {
    // loadAssociate().catch(error => {
    //   alert("Loading Associate failed" + error);
    // });
    // loadCategories().catch(error => {
    //   alert("Loading Categories failed" + error);
    // });
    if (associate.length === 0) {
      loadAssociate().catch(error => {
        alert("Loading Associate failed" + error);
      });
    }
    // if (categories.length === 0) {
    //   loadCategories().catch(error => {
    //     alert("Loading Categories failed" + error);
    //   });
    // }
  }, []);
  /*
    expose/connect the component own state course to redux props ...props
  */
  // need to set the second param in useEffect
  // and use setCourse again to load the reselected redux state course
  // for component own state course when evey time the component mounts

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    // setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    // setSaving(true);
    saveCourse(course)
      .then(() => {
        // toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        // setSaving(false);
        // setErrors({ onSave: error.message });
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <AttributeHeaderInfo attribute={attribute} onChange={handleChange} />
      <Divider className={classes.divider} />
      <AttributeMainEdit
        associate={associate}
        categories={categories}
        loading={loading}
        searchCategoriesFilter={searchCategoriesFilter}
        loadCategories={loadCategories}
        deleteAssociateOptimistic={deleteAssociateOptimistic}
        addCategoryToAttribute={addCategoryToAttribute}
      />
    </>
  );
}

EditAttributeContainer.propTypes = {
  course: PropTypes.object.isRequired,
  saveCourse: PropTypes.func,
  history: PropTypes.object.isRequired,
  loadAssociate: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  associate: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  searchCategoriesFilter: PropTypes.func.isRequired,
  deleteAssociateOptimistic: PropTypes.func.isRequired,
  addCategoryToAttribute: PropTypes.func.isRequired
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
  // which is to reselect from the courses and
  // set the single course item
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
    authors: state.authors,
    loading: state.apiCallsStatus > 0,
    attribute: state.editAttribute.attributeHeader,
    associate: state.editAttribute.associateCategories,
    categories: state.editAttribute.allCategories
  };
};

const mapDispatchToProps = {
  loadAssociate,
  loadCategories,
  loadAuthors,
  searchCategoriesFilter,
  deleteAssociateOptimistic,
  addCategoryToAttribute
  //   saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAttributeContainer);

export { EditAttributeContainer }; // export it for test
