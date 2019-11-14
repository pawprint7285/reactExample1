/* eslint-disable import/no-duplicates */
import React from "react";
import PropTypes from "prop-types";
// import TextInput from "../utilities/form-elements/TextInput";
// import SelectInput from "../utilities/form-elements/SelectInput";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import AssociateCategories from "./AssociateCategories";
import Divider from "@material-ui/core/Divider";
import AllCategories from "./AllCategories";

import "./attributeMainEdit.scss";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const style = {
  padding: 0,
  paddingTop: 12
};

// const styleA = {
//   paddingTop: 8,
//   paddingLeft: 16,
//   paddingRight: 0,
//   paddingBottom: 3.4
// };

const AttributeMainEdit = ({
  //   course,
  //   authors,
  //   onSave,
  // onChange,
  //   saving = false,
  //   errors = {}
  associate,
  categories,
  loading,
  searchCategoriesFilter,
  loadCategories,
  deleteAssociateOptimistic,
  addCategoryToAttribute
}) => {
  const classes = useStyles();

  // if (associate !== undefined && !loading) {
  //   console.log("test load associate 2: " + associate);
  // }

  // if (categories !== undefined && !loading) {
  //   console.log("test load categories 2: " + categories);
  // }

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedF: true,
    checkedG: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <AssociateCategories
          associate={associate}
          loading={loading}
          deleteAssociateOptimistic={deleteAssociateOptimistic}
          categories={categories}
          searchCategoriesFilter={searchCategoriesFilter}
          loadCategories={loadCategories}
          addCategoryToAttribute={addCategoryToAttribute}
        />
        <Divider className={classes.divider} />
        {/* <AllCategories
          categories={categories}
          loading={loading}
          searchCategoriesFilter={searchCategoriesFilter}
          loadCategories={loadCategories}
          addCategoryToAttribute={addCategoryToAttribute}
        /> */}
        <Divider className={classes.divider} />
        <Grid
          item
          style={style}
          className="attr-header-info"
          xs={12}
          align="center"
        >
          <Button variant="contained" size="small" className={classes.button}>
            <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

AttributeMainEdit.propTypes = {
  // authors: PropTypes.array.isRequired,
  // course: PropTypes.object.isRequired,
  // errors: PropTypes.object,
  // onSave: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // saving: PropTypes.bool,
  attribute: PropTypes.object,
  associate: PropTypes.array,
  categories: PropTypes.array,
  loading: PropTypes.bool,
  searchCategoriesFilter: PropTypes.func,
  loadCategories: PropTypes.func,
  deleteAssociateOptimistic: PropTypes.func,
  addCategoryToAttribute: PropTypes.func
};

export default AttributeMainEdit;
