import {
  Alert,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { SettingStack, SecondaryText } from './styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { updatePassword, updateUsername } from '../../../api/UserAPI';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useUser } from '../../../context/UserContext';
import { theme } from '../../../assets/styles';
import {
  UpdatePasswordVals,
  UpdateUsernameVals,
} from '../../../interfaces/interfaces';

const validationSchemaUsername = yup.object().shape({
  username: yup.string().required('Username cannot be empty'),
});

const validationSchemaPassword = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password cannot be empty'),
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Return the list of settings component
 * @returns {JSX.Element} - List of settings component
 */
export const SettingsListComponent = (): JSX.Element => {
  const { username } = useUser();
  const [currUsername, setCurrUsername] = React.useState(username);

  const [editUsername, setEditUsername] = React.useState(false);
  const [editPassword, setEditPassword] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(' ');
  const [generalError, setGeneralError] = React.useState(' ');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleUpdateUsername = async (values: UpdateUsernameVals) => {
    try {
      const { username } = values;
      const response = await updateUsername({
        username,
      });
      if (response.status === 200) {
        setOpenSnackbar(true);
        setCurrUsername(username);
        setEditUsername(false);
        await delay(3000);
      } else {
        setGeneralError('An error occurred, please try again');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        const errorData = axiosError.response?.data as { message: string };
        if (
          axiosError.response?.status === 400 &&
          errorData.message === 'Invalid credentials'
        ) {
          setUsernameError('Invalid credentials');
        } else if (
          axiosError.response?.status === 400 &&
          errorData.message === 'Username already exists'
        ) {
          setUsernameError('Username already exists');
        } else {
          setGeneralError('An error occurred, please try again');
        }
      } else {
        setGeneralError('An error occurred, please try again');
      }
    }
  };

  const handleUpdatePassword = async (values: UpdatePasswordVals) => {
    try {
      const { password } = values;
      const response = await updatePassword({
        password,
      });
      if (response.status === 200) {
        setOpenSnackbar(true);
        setEditPassword(false);
        await delay(3000);
      } else {
        setGeneralError('An error occurred, please try again');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        const errorData = axiosError.response?.data as { message: string };
        if (
          axiosError.response?.status === 400 &&
          errorData.message === 'Invalid credentials'
        ) {
          setGeneralError('Invalid credentials');
        } else {
          setGeneralError('An error occurred, please try again');
        }
      } else {
        setGeneralError('An error occurred, please try again');
      }
    }
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError(' ');
    formikUsername.handleChange(event);
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

  const formikUsername = useFormik({
    initialValues: {
      username: username ?? '',
    },
    validationSchema: validationSchemaUsername,
    onSubmit: (values: UpdateUsernameVals) => {
      setGeneralError(' ');
      handleUpdateUsername(values);
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchemaPassword,
    onSubmit: (values: UpdatePasswordVals) => {
      setGeneralError(' ');
      handleUpdatePassword(values);
    },
  });

  return (
    <form
      onSubmit={
        editUsername ? formikUsername.handleSubmit : formikPassword.handleSubmit
      }
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
          Successfully Updated!
        </Alert>
      </Snackbar>
      <Typography variant={'subtitle1'}> Username </Typography>
      {editUsername ? (
        <SettingStack direction="row" style={{ paddingBottom: '1rem' }}>
          <TextField
            id="username"
            value={formikUsername.values.username}
            onChange={handleUsernameChange}
            onBlur={formikUsername.handleBlur}
            error={
              formikUsername.touched.username &&
              (Boolean(formikUsername.errors.username) || usernameError != ' ')
            }
            helperText={
              formikUsername.touched.username &&
              Boolean(formikUsername.errors.username)
                ? formikUsername.errors.username
                : usernameError
            }
            variant="standard"
            size="small"
            inputProps={{
              style: {
                padding: '1rem',
                color: theme.palette.primary.contrastText,
              },
            }}
            type="text"
          ></TextField>
          <Stack direction={'row'} justifyContent={'center'}>
            <IconButton style={{ color: 'white' }}>
              <ClearIcon
                onClick={() => {
                  setEditUsername(false);
                }}
              />
            </IconButton>
            <IconButton style={{ color: 'white' }} type="submit">
              <SaveAltIcon />
            </IconButton>
          </Stack>
        </SettingStack>
      ) : (
        <SettingStack direction="row" style={{ paddingBottom: '1rem' }}>
          <SecondaryText variant={'subtitle2'}>{currUsername}</SecondaryText>
          <IconButton
            disabled={editPassword}
            style={{ opacity: editPassword ? 0 : 1, color: 'white' }}
            onClick={() => {
              editPassword ? setEditUsername(false) : setEditUsername(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </SettingStack>
      )}
      <Divider color={'white'} />
      <Typography variant={'subtitle1'} style={{ paddingTop: '1rem' }}>
        Password
      </Typography>
      {editPassword ? (
        <SettingStack direction="row">
          <TextField
            id="password"
            value={formikPassword.values.password}
            onChange={formikPassword.handleChange}
            onBlur={formikPassword.handleBlur}
            error={
              formikPassword.touched.password &&
              Boolean(formikPassword.errors.password)
            }
            helperText={
              formikPassword.touched.password &&
              Boolean(formikPassword.errors.password)
                ? formikPassword.errors.password
                : ' '
            }
            variant="standard"
            size="small"
            inputProps={{
              style: {
                padding: '1rem',
                color: theme.palette.primary.contrastText,
              },
            }}
            type="text"
          ></TextField>
          <Stack direction={'row'} justifyContent={'center'}>
            <IconButton style={{ color: 'white' }}>
              <ClearIcon
                onClick={() => {
                  setEditPassword(false);
                }}
              />
            </IconButton>
            <IconButton style={{ color: 'white' }} type="submit">
              <SaveAltIcon />
            </IconButton>
          </Stack>
        </SettingStack>
      ) : (
        <SettingStack direction="row">
          <SecondaryText variant={'subtitle2'}>{'********'}</SecondaryText>
          <IconButton
            disabled={editUsername}
            style={{ opacity: editUsername ? 0 : 1, color: 'white' }}
            onClick={() => {
              editUsername ? setEditPassword(false) : setEditPassword(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </SettingStack>
      )}
      <Typography
        variant="body1"
        align="center"
        color="error"
        style={{
          opacity: generalError == ' ' ? 0 : 1,
        }}
      >
        {generalError}
      </Typography>
    </form>
  );
};

export default SettingsListComponent;
