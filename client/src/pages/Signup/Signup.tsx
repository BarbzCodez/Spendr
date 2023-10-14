import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Alert, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { PrimaryButton, PrimaryDiv } from '../../assets/styles/styles';
import Header from '../../components/Header';
import { RightBox, LeftStack, SignupBox, ClipArt } from './styles';
import picture from '../../assets/images/otherStonks-noBackgrounds.png';
import { theme } from '../../assets/styles/theme';
import { SignupFields } from '../../interfaces/interfaces';
import { signup } from '../../api/UserAPI';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username cannot be empty'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password cannot be empty'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password cannot be empty'),
  securityQuestion: yup.string().required('Security question cannot be empty'),
  securityAnswer: yup
    .string()
    .required('Security answer answer cannot be empty'),
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Signup = () => {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = React.useState(' ');
  const [generalError, setGeneralError] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSignup = async (values: SignupFields) => {
    try {
      const { username, password, securityQuestion, securityAnswer } = values;
      const response: AxiosResponse = await signup({
        username,
        password,
        securityQuestion,
        securityAnswer,
      });
      if (response.status === 201) {
        setOpenSnackbar(true);
        await delay(3000);
        navigate('/login');
      } else {
        setGeneralError(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response?.status === 400) {
          setUsernameError('Username already exists');
        } else {
          setGeneralError(true);
        }
      } else {
        setGeneralError(true);
      }
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError(' ');
    formik.handleChange(event);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: SignupFields) => {
      setGeneralError(false);
      handleSignup(values);
    },
  });

  return (
    <PrimaryDiv>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Username successfully created!
        </Alert>
      </Snackbar>
      <Header isLoggedIn={false} />
      <SignupBox>
        <LeftStack direction="column" spacing={'2vh'} alignItems="center">
          <Typography variant="h3">Create Account</Typography>
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
              onChange={handleUsernameChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username &&
                (Boolean(formik.errors.username) || usernameError != ' ')
              }
              helperText={
                formik.touched.username && Boolean(formik.errors.username)
                  ? formik.errors.username
                  : usernameError
              }
              sx={{ marginBottom: 1 }}
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
              sx={{ marginBottom: 1 }}
            />
            <TextField
              required
              id="confirmPassword"
              label="Confirm Password"
              variant="filled"
              size="small"
              inputProps={{
                style: { color: theme.palette.primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: theme.palette.primary.contrastText },
              }}
              style={{ width: 300 }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
                  ? formik.errors.confirmPassword
                  : ' '
              }
              sx={{ marginBottom: 1 }}
            />
            <TextField
              required
              id="securityQuestion"
              label="Security Question"
              variant="filled"
              size="small"
              inputProps={{
                style: { color: theme.palette.primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: theme.palette.primary.contrastText },
              }}
              style={{ width: 300 }}
              value={formik.values.securityQuestion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.securityQuestion &&
                Boolean(formik.errors.securityQuestion)
              }
              helperText={
                formik.touched.securityQuestion &&
                Boolean(formik.errors.securityQuestion)
                  ? formik.errors.securityQuestion
                  : ' '
              }
              sx={{ marginBottom: 1 }}
            />
            <TextField
              required
              id="securityAnswer"
              label="Security Answer"
              variant="filled"
              size="small"
              inputProps={{
                style: { color: theme.palette.primary.contrastText },
              }}
              InputLabelProps={{
                style: { color: theme.palette.primary.contrastText },
              }}
              style={{ width: 300 }}
              value={formik.values.securityAnswer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.securityAnswer &&
                Boolean(formik.errors.securityAnswer)
              }
              helperText={
                formik.touched.securityAnswer &&
                Boolean(formik.errors.securityAnswer)
                  ? formik.errors.securityAnswer
                  : ' '
              }
              sx={{ marginBottom: 1 }}
            />
            <Typography
              variant="body1"
              color="error"
              style={{
                color: `${theme.palette.error}`,
                opacity: generalError ? 1 : 0,
              }}
            >
              An error occurred, try again
            </Typography>
            <PrimaryButton
              variant="contained"
              style={{ width: 300, marginTop: 5 }}
              type="submit"
            >
              Sign Up
            </PrimaryButton>
          </form>
        </LeftStack>
        <RightBox>
          <ClipArt src={picture} alt="Picutre" />
        </RightBox>
      </SignupBox>
    </PrimaryDiv>
  );
};

export default Signup;
