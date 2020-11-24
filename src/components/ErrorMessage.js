import React from 'react';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const ErrorMessage = ({ error }) => {
  const classes = useStyles();

  return (
    <div className={classes.alert}>
      <Alert severity="error">{error}</Alert>
    </div>
  );
};

export default ErrorMessage;
