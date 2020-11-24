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
import * as yup from 'yup';

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

const validationSchema = yup.object({
  email: yup
    .string('Enter you email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter you email')
    .min(8, 'Minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .test(
      'passwords-match',
      "Those passwords didn't match. Try again.",
      function (value) {
        return this.parent.password === value;
      }
    ),
});

const Signup = () => {
  const { signup, currentUser } = useAuth();

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
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        await signup(email, password);
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
          Sign Up
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
          <TextField
            fullWidth
            id="confirmPassword"
            label="Confirm"
            type="password"
            margin="normal"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
