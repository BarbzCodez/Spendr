import React from 'react';
import { Alert, Snackbar, Stack, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { theme } from '../../../assets/styles';
import { deleteUser } from '../../../api/UserAPI';
import { useUser } from '../../../context/UserContext';

import {
  SettingStack,
  DangerZoneStackElements,
  DeleteButton,
  ErrorBox,
  SecondaryTextDangerZone,
} from './styles';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Return the the box component with the danger zone attributes
 * @returns {JSX.Element} - Danger Zone component
 */
const DangerZone = (): JSX.Element => {
  const navigate = useNavigate();
  const { userId, token } = useUser();

  const [generalError, setGeneralError] = React.useState(' ');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleDeleteUser = async () => {
    try {
      if (userId != null && token != null) {
        const response = await deleteUser({
          userId,
          token,
        });
        if (response.status === 200) {
          setOpenSnackbar(true);

          await delay(3000);
          navigate('/');
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
  const formikDelete = useFormik({
    initialValues: {},
    onSubmit: () => {
      setGeneralError(' ');
      handleDeleteUser();
    },
  });

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const deleteButton = () => (
    <DeleteButton
      type="submit"
      variant="outlined"
      startIcon={<DeleteForeverIcon />}
      aria-label="delete-account-button"
      sx={{ whiteSpace: 'nowrap' }}
      onClick={() => formikDelete.handleSubmit()}
    >
      Delete Forever
    </DeleteButton>
  );

  const deleteText = () => (
    <Stack>
      <Typography variant="subtitle1">Delete Account</Typography>
      <SecondaryTextDangerZone variant="subtitle2">
        Once deleted, there will be no way of retrieving this account
      </SecondaryTextDangerZone>
    </Stack>
  );

  return (
    <SettingStack>
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
          Your account has been deleted! Thank you for using Spendr
        </Alert>
      </Snackbar>
      <Typography variant="h5" component="h3" p="1rem" noWrap>
        {'Danger Zone'}
      </Typography>
      <ErrorBox
        sx={{
          border: '2px solid',
          borderColor: theme.palette.error.main,
        }}
      >
        <DangerZoneStackElements spacing={2}>
          {deleteText()}
          {deleteButton()}
        </DangerZoneStackElements>
      </ErrorBox>
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
    </SettingStack>
  );
};
export default DangerZone;
