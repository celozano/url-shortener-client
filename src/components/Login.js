import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';

import ErrorMessage from './ErrorMessage';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '7em',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const { login, currentUser } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      history.replace('/');
    }
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = React.useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        await login(email, password);
        history.push('/');
      } catch (e) {
        setError(e.message);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Grid item className={classes.container}>
        <Typography align="center" variant="h5">
          Log In
          <Divider />
        </Typography>
        {error && <ErrorMessage error={error} />}
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            margin="normal"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs style={{ textAlign: 'right' }}>
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
