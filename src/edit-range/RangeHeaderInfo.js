import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import "./rangeHeaderInfo.scss";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const style = {
  padding: 0
};

const styleA = {
  paddingTop: 16.4,
  paddingLeft: 6.4,
  paddingRight: 0,
  paddingBottom: 3.4
};

const styleB = {
  paddingTop: 16,
  paddingLeft: 22.4,
  paddingRight: 4,
  paddingBottom: 4.2
};

const styleC = {
  paddingTop: 4.8,
  paddingLeft: 22.4,
  paddingRight: 2,
  paddingBottom: 16
};

const RangeHeaderInfo = ({
  //   course,
  //   authors,
  // onSave,
  onChange,
  //   saving = false,
  //   errors = {},
  range
}) => {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item style={style} className="range-header-info" xs={6}>
        <span className="padding-left" style={{ gridColumnEnd: "span 3" }}>
          <TextField
            id="outlined-dense"
            label="Alias"
            name="alias"
            value={range.alias}
            onChange={onChange}
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
          />
        </span>
      </Grid>
      <Grid
        item
        style={styleA}
        className="range-header-info padding-top-and-left"
        xs={6}
      >
        <span
          className="padding-left"
          style={{ gridColumnEnd: "span 3" }}
        >{`Category Type:`}</span>
        <span className="padding-left" style={{ gridColumnEnd: "span 3" }}>
          {range.type}
        </span>
      </Grid>
      <Grid
        item
        style={styleB}
        className="range-header-info padding-top-and-left-a"
        xs={6}
      >
        <span style={{ gridColumnEnd: "span 3" }}>{`Name:`}</span>
        <span className="padding-left" style={{ gridColumnEnd: "span 3" }}>
          {range.name}
        </span>
      </Grid>
      <Grid item style={style} className="range-header-info" xs={6}>
        <span className="padding-left" style={{ gridColumnEnd: "span 3" }}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Status
            </InputLabel>
            <Select
              className="display-range-status"
              native
              value={range.status}
              onChange={onChange}
              input={
                <OutlinedInput
                  name="status"
                  labelWidth={labelWidth}
                  id="outlined-age-native-simple"
                />
              }
            >
              <option value="" />
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              {/* <option value={30}>Thirty</option> */}
            </Select>
          </FormControl>
        </span>
      </Grid>
      <Grid
        item
        style={styleC}
        className="range-header-info padding-top-and-left-b"
        xs={6}
      >
        <span style={{ gridColumnEnd: "span 3" }}>{`Id:`}</span>
        <span className="padding-left" style={{ gridColumnEnd: "span 3" }}>
          {range.id}
        </span>
      </Grid>
    </Grid>
  );
};

RangeHeaderInfo.propTypes = {
  // authors: PropTypes.array.isRequired,
  // course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  // onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  range: PropTypes.object.isRequired
};

export default RangeHeaderInfo;
