import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import _ from "lodash";
import { toast } from "react-toastify";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0)
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name"
  },
  {
    id: "catalogType",
    numeric: false,
    disablePadding: false,
    label: "Catalog Type"
  },
  { id: "id", numeric: false, disablePadding: false, label: "Id" },
  { id: "uid", numeric: false, disablePadding: false, label: "UId" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Add-Category"
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          All Categories
        </Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
}));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const AllCategories = ({
  categories,
  loading,
  history,
  searchCategoriesFilter,
  loadCategories,
  addCategoryToAttribute,
  ...props
}) => {
  const classes = useStyles();

  // if (categories !== undefined && !loading) {
  //   console.log("test load categories 3: " + categories.length);
  //   // searchCategoriesFilter("testSearchStringAAA");
  // }

  const rowsLength =
    categories !== undefined && !loading ? categories.length : 0;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandedChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [state, setState] = React.useState({
    searchText: ""
  });

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [addedItem, setAddedItem] = React.useState({});

  const closeAndCallAddApi = () => {
    setOpen(false);

    addCategoryToAttribute(addedItem);

    toastifyDebounceReady();
  };

  const toastifyDebounced = () => {
    // if (searchStr === "" || filterArray.length === 0) {
    //   console.log("null string get ready to load the entire categories");
    //   // loadCategories();
    // }
    toast.success("Category Added");
  };

  const toastifyDebounceReady = _.debounce(toastifyDebounced, 2000);

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    setOpen(true);

    // const location = {
    //   pathname: "Category-info/101857",
    //   state: { fortest: "aaa" }
    // };

    setAddedItem(name);
    // deletedIndx = selectedIndex;

    console.log(
      "row click category Id: " + event.target.value + ", " + name.name
    );
    // addCategoryToAttribute(name);
    // history.push(location);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const handleSearchChange = event => {
    event.persist();
    console.log("test search input change: " + event.target.value);
    let filterResult = categories.filter(
      cat => cat.name === event.target.value
    );
    // if (event.target.value === "" || filterResult.length === 0) {
    //   console.log("null string do something");
    // }
    // searchCategoriesFilter(event.target.value);
    // _.debounce(searchCategoriesFilter(event.target.value), 2000);
    alreadyDebounced(event);
    // noneMatchDebounceReady(event.target.value, filterResult);
  };

  const onChangeDebounced = event => {
    searchCategoriesFilter(event.target.value);
  };

  const alreadyDebounced = _.debounce(onChangeDebounced, 1800);

  const noneMatchDebounced = (searchStr, filterArray) => {
    if (searchStr === "" || filterArray.length === 0) {
      console.log("null string get ready to load the entire categories");
      loadCategories();
    }
  };

  const noneMatchDebounceReady = _.debounce(noneMatchDebounced, 2200);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rowsLength - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {/* <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleExpandedChange("panel4")}
      > */}
      {/* <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading} variant="h6" id="tableTitle">
            All Categories
          </Typography>
        </ExpansionPanelSummary> */}
      {/* <ExpansionPanelDetails>
        </ExpansionPanelDetails> */}
      <Paper className={classes.paper}>
        <div style={{ textAlign: "center" }}>
          <IconButton className={classes.iconButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            onChange={handleSearchChange}
            className={classes.input}
            placeholder="Search Categories"
            inputProps={{ "aria-label": "Search Google Maps" }}
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsLength}
            />
            <TableBody>
              {categories !== undefined && !loading ? (
                categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={event => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox" />
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Link to={"/category-info/" + row.id}>
                            {row.name}
                          </Link>
                        </TableCell>
                        <TableCell align="left">{row.catalogType}</TableCell>
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.uid}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell
                          // hover
                          style={{ cursor: "pointer" }}
                          onClick={event => handleClick(event, row)}
                          align="center"
                        >
                          <AddCircleIcon />
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <Typography
                  className={classes.heading}
                  variant="h6"
                  // id="tableTitle" &&
                  // categories.length !== 1
                >
                  {`Loading data...`}
                </Typography>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          SelectProps={{
            inputProps: { "aria-label": "Rows per page" },
            native: true
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Add Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to add category ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={closeAndCallAddApi} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* </ExpansionPanel> */}
    </div>
  );
};

AllCategories.propTypes = {
  // authors: PropTypes.array.isRequired,
  // course: PropTypes.object.isRequired,
  // errors: PropTypes.object,
  // onSave: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // saving: PropTypes.bool,
  // attribute: PropTypes.object,
  categories: PropTypes.array,
  loading: PropTypes.func,
  history: PropTypes.object,
  searchCategoriesFilter: PropTypes.func,
  loadCategories: PropTypes.func,
  addCategoryToAttribute: PropTypes.func
};

export default AllCategories;
