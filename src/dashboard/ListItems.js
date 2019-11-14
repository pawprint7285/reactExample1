import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
// import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ListIcon from "@material-ui/icons/List";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import ViewListIcon from "@material-ui/icons/ViewList";

import SearchIcon from "@material-ui/icons/Search";
import StoageIcon from "@material-ui/icons/Storage";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined";

export const firstListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ViewHeadlineIcon />
      </ListItemIcon>
      <ListItemText primary="Category Search" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Attribute Search" />
    </ListItem>
  </div>
);

export const secondListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <BeenhereIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItem>
  </div>
);

export const thirdListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Tree Browse" />
    </ListItem>
  </div>
);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/" className={classes.nested}>
            <ListItemIcon>
              <StoageIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="attributes"
            className={classes.nested}
          >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Attributes" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button component={Link} to="attribute">
        <ListItemIcon>
          <InsertChartOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="New Attribute" />
      </ListItem>
      <ListItem button component={Link} to="range">
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="New Range" />
      </ListItem>
    </List>
  );
}
