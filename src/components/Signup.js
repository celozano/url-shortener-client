import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  email: yup
    .string('Enter you email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter you email')
    .min(8, 'Minimum 8 characters length')
    .required('Password is required'),
});

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signup, currentUser } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      history.replace('/');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        await signup(email, password);
        history.push('/');
      } catch {
        console.log('error');
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Grid item className={classes.container}>
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
            Sign up
          </Button>
          <Grid container>
            <Grid item xs style={{ textAlign: 'right' }}>
              <Link to="/login">Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Signup;
