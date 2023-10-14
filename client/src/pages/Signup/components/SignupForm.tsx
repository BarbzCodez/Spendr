import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Typography, TextField, Alert, Snackbar } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { PrimaryButton } from '../../../assets/styles/styles';
import { theme } from '../../../assets/styles';
import { signup } from '../../../api/UserAPI';

interface SignupFields {
  username: string;
  password: string;
  confirmPassword: string;
  securityQuestion: string;
  securityAnswer: string;
}

interface SignupTextFieldProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

const SignupTextField: React.FC<SignupTextFieldProps> = ({
  id,
  label,
  value,
  type = 'text',
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  return (
    <TextField
      required
      id={id}
      label={label}
      variant="filled"
      size="small"
      type={type}
      inputProps={{
        style: { color: theme.palette.primary.contrastText },
      }}
      InputLabelProps={{
        style: { color: theme.palette.primary.contrastText },
      }}
      style={{ width: 300 }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
    />
  );
};

/**
 * Signup form for signup page
 *
 * @returns {JSX.Element} - Signup form
 */
const SignupForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = React.useState(' '); // initial state is space to reserve the vertical space for the error
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
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Username successfully created!
        </Alert>
      </Snackbar>
      <SignupTextField
        id="username"
        label="Username"
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
      />
      <SignupTextField
        id="password"
        label="Password"
        value={formik.values.password}
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && Boolean(formik.errors.password)
            ? formik.errors.password
            : ' '
        }
      />
      <SignupTextField
        id="confirmPassword"
        label="Confirm Password"
        value={formik.values.confirmPassword}
        type="password"
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
      />
      <SignupTextField
        id="securityQuestion"
        label="Security Question"
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
      />
      <SignupTextField
        id="securityAnswer"
        label="Security Answer"
        value={formik.values.securityAnswer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.securityAnswer && Boolean(formik.errors.securityAnswer)
        }
        helperText={
          formik.touched.securityAnswer && Boolean(formik.errors.securityAnswer)
            ? formik.errors.securityAnswer
            : ' '
        }
      />
      <Typography
        variant="body1"
        align="center"
        color="error"
        style={{
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
  );
};

export default SignupForm;
