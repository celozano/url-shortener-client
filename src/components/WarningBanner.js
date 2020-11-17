import React from "react";
import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
  },
}));

const WarningBanner = ({ warn, message }) => {
  const classes = useStyles();

  if (!warn) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Alert severity="error">{message}</Alert>
    </div>
  );
};

export default WarningBanner;
