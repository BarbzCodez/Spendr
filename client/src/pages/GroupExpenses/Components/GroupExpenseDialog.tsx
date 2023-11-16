import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import {
  Stack,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
  Button,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  GroupExpenseDialogProps,
  GroupExpenseUIData,
} from '../../../interfaces/groupSplitInterfaces';
import { capitalizeWord, isoToFormattedDate } from '../../../assets/utils';
import { categories } from '../../../assets/constants';
import { PrimaryButton, theme } from '../../../assets/styles';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title cannot be empty'),
  amount: yup
    .number()
    .typeError('Amount must be a valid number')
    .positive('Amount must be greater than 0')
    .required('Amount cannot be empty'),
  category: yup.string().oneOf(categories).required('Category cannot be empty'),
  createdAt: yup
    .string()
    .matches(
      /^(?:20\d{2}|19\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      'Date must be in valid YYYY/MM/DD format',
    )
    .required('Date cannot be empty'),
  split: yup.object(),
});

/**
 * Group Expense dialog component
 *
 * @property {string} username - current username of the user
 * @property {boolean} open - open/closed state of the dialog
 * @property {function} onClose - function when cancel is clicked
 * @property {function} onAdd - function when save is clicked
 *
 * @returns {JSX.Element} - expense group dialog component
 */
const GroupExpenseDialog: FC<GroupExpenseDialogProps> = ({
  username,
  open,
  onClose,
  onAdd,
}): JSX.Element => {
  const defaultUserList: [username: string, amount: number, error: string][] = [
    [username, 0, ''],
    ['', 0, ''],
  ];

  const [userList, setUserList] =
    useState<[username: string, amount: number, error: string][]>(
      defaultUserList,
    );

  const [evenlyDistributed, setEvenlyDistributed] = useState<boolean>(true);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>('');

  const handleSnackbarClose = (
    event?: SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setGeneralError('');
    setIsSnackbarOpen(false);
  };

  function validUserList(): boolean {
    let isValid = true;
    let currPercentage = 0;
    let foundError = false;

    const updatedUserList = [...userList];
    const uniqueUsername = new Set<string>();

    userList.forEach((user, index) => {
      if (uniqueUsername.has(user[0])) {
        updatedUserList[index][2] = 'Cant have repeated usernames';
        foundError = true;
      } else {
        uniqueUsername.add(user[0]);
      }

      if (user[0] == '') {
        updatedUserList[index][2] = 'Username cannot be empty';
        foundError = true;
      }
      currPercentage += Number(user[1]);
    });

    if (Math.abs(currPercentage - 100) >= 0.001) {
      setGeneralError(
        `The total percentage must add to 100, your current total adds to: ${currPercentage}`,
      );
      setIsSnackbarOpen(true);
      isValid = false;
    }

    if (foundError) {
      setUserList(updatedUserList);
      isValid = false;
    }

    return isValid;
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      amount: 0,
      category: '',
      createdAt: isoToFormattedDate(new Date().toISOString()),
      split: {},
    },
    validationSchema: validationSchema,
    onSubmit: (values: GroupExpenseUIData) => {
      const isValid = validUserList();
      if (isValid) {
        const [year, month, day] = values.createdAt.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));

        const splitDict: { [key: string]: number } = {};

        userList.forEach((element) => {
          splitDict[element[0]] = element[1] / 100;
        });

        onAdd({
          title: values.title,
          amount: values.amount,
          category: values.category,
          createdAt: date.toISOString(),
          split: splitDict,
        });
      }
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setUserList(defaultUserList);
    }
  }, [open]);

  useEffect(() => {
    if (evenlyDistributed) {
      setUserList((prevList) =>
        prevList.map(([username]) => [
          username,
          getPercentage(userList.length),
          '',
        ]),
      );
    }
  }, [evenlyDistributed, formik.values.amount]);

  const getPercentage = (size: number) => {
    return (1 / size) * 100;
  };

  const handleAddUser = () => {
    let percentage = 0;
    if (evenlyDistributed) {
      percentage = getPercentage(userList.length + 1);
      setUserList((prevList) =>
        prevList.map(([username]) => [username, percentage, '']),
      );
    }
    setUserList((prevList) => [...prevList, ['', percentage, '']]);
  };

  const handleDeleteUser = () => {
    if (userList.length <= 2) {
      setGeneralError('Cant have less than 2 users in a group split');
      setIsSnackbarOpen(true);
    } else if (evenlyDistributed) {
      setUserList((prevList) =>
        prevList.map(([username]) => [
          username,
          getPercentage(userList.length - 1),
          '',
        ]),
      );
      setUserList((prevList) => prevList.slice(0, prevList.length - 1));
    }
  };

  const handleUserInput = (
    input: string | number,
    index: number,
    place: number,
  ) => {
    const updatedUserList = [...userList];
    updatedUserList[index][place] = input;
    if (input == username) {
      updatedUserList[index][2] = 'Cant have repeated usernames';
    } else {
      updatedUserList[index][2] = '';
    }
    setUserList(updatedUserList);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {generalError}
        </Alert>
      </Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{'Create Group Split'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              type="string"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={
                formik.touched.title && Boolean(formik.errors.title)
                  ? formik.errors.title
                  : ' '
              }
              style={{ width: 300 }}
            />
            <TextField
              id="createdAt"
              label="Date"
              variant="filled"
              value={formik.values.createdAt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.createdAt && Boolean(formik.errors.createdAt)
              }
              helperText={
                formik.touched.createdAt && Boolean(formik.errors.createdAt)
                  ? formik.errors.createdAt
                  : ' '
              }
              style={{ width: 300 }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <TextField
              id="amount"
              label="Amount"
              variant="filled"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={
                formik.touched.amount && Boolean(formik.errors.amount)
                  ? formik.errors.amount
                  : ' '
              }
              style={{ width: 300 }}
            />
            <TextField
              select
              id="category"
              label="Category"
              variant="filled"
              value={formik.values.category}
              onChange={(event) => {
                event.target.name = 'category';
                formik.handleChange(event);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={
                formik.touched.category && Boolean(formik.errors.category)
                  ? formik.errors.category
                  : ' '
              }
              style={{ width: 300 }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {capitalizeWord(category)}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={evenlyDistributed}
                    onChange={(event) =>
                      setEvenlyDistributed(event.target.checked)
                    }
                  />
                }
                label="Distribute Evenly"
              />
              <Button
                variant="outlined"
                style={{
                  borderColor: theme.palette.secondary.contrastText,
                  color: theme.palette.primary.contrastText,
                }}
                startIcon={<AddIcon />}
                onClick={handleAddUser}
              >
                Add User
              </Button>
              <Button
                variant="outlined"
                style={{
                  borderColor: theme.palette.secondary.contrastText,
                  color: theme.palette.primary.contrastText,
                }}
                startIcon={<RemoveIcon />}
                onClick={handleDeleteUser}
              >
                Delete User
              </Button>
            </Stack>
            {userList.map((values, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <TextField
                  disabled={values[0] == username && values[2] == ''}
                  label={`User ${index + 1}`}
                  type="text"
                  value={values[0] || ''}
                  style={{ width: '70%' }}
                  onChange={(event) =>
                    handleUserInput(event.target.value, index, 0)
                  }
                  error={values[2] != ''}
                  helperText={values[2]}
                />
                <TextField
                  disabled={evenlyDistributed}
                  label={`Percentage ${index + 1}`}
                  type="number"
                  value={
                    evenlyDistributed ? Number(values[1]).toFixed(2) : values[1]
                  }
                  inputProps={{ maxLength: 5 }}
                  onChange={(event) =>
                    handleUserInput(event.target.value, index, 1)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  disabled
                  label={`Amount ${index + 1}`}
                  type="number"
                  variant="standard"
                  value={
                    (formik.values.amount * (values[1] / 100)).toFixed(2) || ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>Cancel</PrimaryButton>
          <PrimaryButton type="submit"> Save </PrimaryButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GroupExpenseDialog;
