/* eslint-disable import/no-duplicates */
import React from "react";
import PropTypes from "prop-types";
// import TextInput from "../utilities/form-elements/TextInput";
// import SelectInput from "../utilities/form-elements/SelectInput";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import "./rangeMainEdit.scss";

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
  padding: 0
};

const styleA = {
  paddingTop: 8,
  paddingLeft: 16,
  paddingRight: 0,
  paddingBottom: 3.4
};

const RangeMainEdit = ({
  // course,
  // authors,
  //   onSave,
  onChange,
  //   saving = false,
  //   errors = {}
  range
}) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedF: true,
    checkedG: true
  });

  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  // const [values, setValues] = React.useState({
  //   age: "",
  //   name: "hai"
  // });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  //   function handleSelectChange(event) {
  //     setValues(oldValues => ({
  //       ...oldValues,
  //       [event.target.name]: event.target.value
  //     }));
  //   }

  return (
    <div>
      <Typography className="padding-bottom" variant="subtitle1" gutterBottom>
        Edit Range:
      </Typography>
      <Grid container spacing={3}>
        <Grid item style={style} className="attr-header-info" xs={12}>
          <div className="custom-div-display-from">{`from`}</div>
          <TextField
            id="outlined-number"
            label={range.name}
            name="rangeLow"
            value={range.rangeLow}
            onChange={onChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
          <div className="custom-div-display-to">{`to`}</div>
          <TextField
            id="outlined-number"
            label={range.name}
            name="rangeHigh"
            value={range.rangeHigh}
            onChange={onChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item style={styleA} className="check-box-padding" xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange("checkedB")}
                value="checkedB"
                color="primary"
              />
            }
            label="Left Nav Use ?"
          />
        </Grid>
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

RangeMainEdit.propTypes = {
  authors: PropTypes.array,
  course: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  range: PropTypes.object.isRequired
};

export default RangeMainEdit;
