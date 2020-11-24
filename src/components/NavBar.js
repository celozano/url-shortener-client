import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.toolbarButtons}>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
