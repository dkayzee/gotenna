/* eslint-disable no-nested-ternary */
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

export default ({ loggedIn, register, setLoggedIn, setRegister }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          goTenna Photo Viewer
        </Typography>
        {loggedIn ? (
          <Button color="default" onClick={() => setLoggedIn(false)}>
            Logout
          </Button>
        ) : register ? (
          <Button color="default" onClick={() => setRegister(false)}>
            Login
          </Button>
        ) : (
          <Button color="default" onClick={() => setRegister(true)}>
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
