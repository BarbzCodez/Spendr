import * as React from 'react';
import { Typography, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { PrimaryButton, PrimaryDiv } from '../../assets/styles/styles';
import Header from '../../components/Header';
import { RightBox, LeftStack, SignupBox, ClipArt } from './styles';
import picture from '../../assets/images/otherStonks-noBackgrounds.png';
import theme from '../../assets/styles/theme';

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

const Signup = () => {
  const handleSignUp = async () => {
    return;
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <PrimaryDiv>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={
                formik.touched.username && Boolean(formik.errors.username)
                  ? formik.errors.username
                  : ' '
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
            <PrimaryButton
              variant="contained"
              onClick={handleSignUp}
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
