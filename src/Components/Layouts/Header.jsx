import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: "black",
    flexGrow: 1
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          goTenna Photo Viewer
        </Typography>
        <Button color="default">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
