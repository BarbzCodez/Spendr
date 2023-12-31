import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
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
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';

import { useUser } from '../../../context/UserContext';
import { updatePassword, updateUsername } from '../../../api/UserAPI';
import {
  UpdatePasswordData,
  UpdateUsernameData,
} from '../../../interfaces/userInterfaces';
import { SettingStack, SecondaryText } from './styles';
import { delay } from '../../../assets/utils';

const validationSchemaUsername = yup.object().shape({
  username: yup.string().required('Username cannot be empty'),
});

const validationSchemaPassword = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password cannot be empty'),
});

/**
 * Return the list of settings component
 *
 * @returns {JSX.Element} - List of settings component
 */
export const SettingsListComponent = (): JSX.Element => {
  const { userId, username, token } = useUser();
  const [currUsername, setCurrUsername] = useState(username);
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(' ');
  const [generalError, setGeneralError] = useState(' ');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const parseUserError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      const errorData = axiosError.response?.data as { message: string };
      if (axiosError.response?.status === 400) {
        if (errorData.message === 'Invalid credentials') {
          setUsernameError('Invalid credentials');
        } else if (errorData.message === 'Username already exists') {
          setUsernameError('Username already exists');
        }
      } else {
        setGeneralError('An error occurred, please try again');
      }
    } else {
      setGeneralError('An error occurred, please try again');
    }
  };

  const handleUpdateUsername = async (values: UpdateUsernameData) => {
    try {
      const { username } = values;
      if (userId != null && token != null) {
        const response = await updateUsername(
          {
            username,
          },
          {
            userId,
            token,
          },
        );
        if (response.status === 200) {
          setOpenSnackbar(true);
          setCurrUsername(username);
          setEditUsername(false);
          await delay(3000);
        } else {
          setGeneralError('An error occurred, please try again');
        }
      }
    } catch (error) {
      parseUserError(error);
    }
  };

  const handleUpdatePassword = async (values: UpdatePasswordData) => {
    try {
      const { password } = values;
      if (userId != null && token != null) {
        const response = await updatePassword(
          {
            password,
          },
          {
            userId,
            token,
          },
        );
        if (response.status === 200) {
          setOpenSnackbar(true);
          setEditPassword(false);
          await delay(3000);
        } else {
          setGeneralError('An error occurred, please try again');
        }
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
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameError(' ');
    formikUsername.handleChange(event);
  };

  const handleSnackbarClose = (
    event?: SyntheticEvent | Event,
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
    onSubmit: (values: UpdateUsernameData) => {
      setGeneralError(' ');
      handleUpdateUsername(values);
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchemaPassword,
    onSubmit: (values: UpdatePasswordData) => {
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
            type="text"
          ></TextField>
          <Stack direction={'row'} justifyContent={'center'}>
            <IconButton
              onClick={() => {
                setEditUsername(false);
              }}
              style={{ color: 'white' }}
            >
              <ClearIcon />
            </IconButton>
            <IconButton type="submit" style={{ color: 'white' }}>
              <SaveAltIcon />
            </IconButton>
          </Stack>
        </SettingStack>
      ) : (
        <SettingStack direction="row" style={{ paddingBottom: '1rem' }}>
          <SecondaryText variant={'subtitle2'}>{currUsername}</SecondaryText>
          <IconButton
            disabled={editPassword}
            style={{ color: 'white' }}
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
            type="text"
          ></TextField>
          <Stack direction={'row'} justifyContent={'center'}>
            <IconButton
              onClick={() => {
                setEditPassword(false);
              }}
              style={{ color: 'white' }}
            >
              <ClearIcon />
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
            style={{ color: 'white' }}
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
