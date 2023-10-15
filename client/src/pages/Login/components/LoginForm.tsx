import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Typography, TextField } from '@mui/material';

import { PrimaryButton } from '../../../assets/styles/styles';
import { theme } from '../../../assets/styles';
import { login } from '../../../api/UserAPI';
import { LoginVals } from '../../../interfaces/interfaces';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username cannot be empty'),
  password: yup.string().required('Password cannot be empty'),
});

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(' ');

  const handleLogin = async (values: LoginVals) => {
    try {
      const response: AxiosResponse = await login(values);
      if (response.status === 200) {
        // navigate to home
        // set global id and token
      } else {
        setError('An error occurred, try again');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response?.status === 400) {
          setError('Invalid credentials');
        } else {
          setError('An error occurred, try again');
        }
      } else {
        setError('An error occurred, try again');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: LoginVals) => {
      setError(' ');
      handleLogin(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <TextField
        required
        id="username"
        label="Username"
        variant="filled"
        size="small"
        inputProps={{
          style: { color: theme.palette.primary.contrastText },
        }}
        InputLabelProps={{
          style: { color: theme.palette.primary.contrastText },
        }}
        style={{ width: 300 }}
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={
          formik.touched.username && Boolean(formik.errors.username)
            ? formik.errors.username
            : ' '
        }
      />
      <TextField
        required
        id="password"
        label="Password"
        variant="filled"
        size="small"
        inputProps={{
          style: { color: theme.palette.primary.contrastText },
        }}
        InputLabelProps={{
          style: { color: theme.palette.primary.contrastText },
        }}
        style={{ width: 300 }}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && Boolean(formik.errors.password)
            ? formik.errors.password
            : ' '
        }
      />
      <Typography
        variant="body1"
        align="center"
        color="error"
        style={{ height: '27px' }}
      >
        {error}
      </Typography>
      <PrimaryButton
        variant="contained"
        style={{ width: 300, marginTop: 5 }}
        type="submit"
      >
        Log In
      </PrimaryButton>
    </form>
  );
};

export default LoginForm;
