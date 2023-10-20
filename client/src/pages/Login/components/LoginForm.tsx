import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Typography, TextField } from '@mui/material';

import { PrimaryButton } from '../../../assets/styles/styles';
import { theme } from '../../../assets/styles';
import { loginRequest } from '../../../api/UserAPI';
import { LoginData, LoginResponse } from '../../../interfaces/interfaces';
import { useUser } from '../../../context/UserContext';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username cannot be empty'),
  password: yup.string().required('Password cannot be empty'),
});

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(' ');
  const { login } = useUser();

  const handleLogin = async (values: LoginData) => {
    try {
      const response: AxiosResponse<LoginResponse> = await loginRequest(values);
      if (response.status === 200) {
        login(
          response.data.user.id,
          response.data.user.username,
          response.data.token,
        );
        navigate('/home');
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
    onSubmit: (values: LoginData) => {
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
        type="password"
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
