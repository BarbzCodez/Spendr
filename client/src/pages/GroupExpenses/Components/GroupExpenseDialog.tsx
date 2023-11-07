import React, { useEffect } from 'react';
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
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  GroupExpenseDialogProps,
  GroupExpenseUIData,
} from '../../../interfaces/interfaces';
import { PrimaryButton } from '../../../assets/styles/styles';
import { capitalizeWord, isoToFormattedDate } from '../../../utils/utils';
import { categories } from '../../../constants/constants';
import { theme } from '../../../assets/styles';

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
 * @param {boolean} open - open/closed state of the dialog
 * @param {function} onClose - function when cancel is clicked
 * @param {function} onSave - function when save is clicked
 * @returns {React.FC} - expense dialog component
 */
const GroupExpenseDialog: React.FC<GroupExpenseDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [userList, setUserList] = React.useState<
    [username: string, amount: number][]
  >([]);

  const [evenlyDistributed, setEvenlyDistributed] =
    React.useState<boolean>(true);

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
      const [year, month, day] = values.createdAt.split('/');
      const date = new Date(Number(year), Number(month) - 1, Number(day));

      setUserList((prevList) => prevList.map(([username]) => [username, 48]));
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
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setUserList([]);
    }
  }, [open]);

  useEffect(() => {
    if (evenlyDistributed) {
      setUserList((prevList) =>
        prevList.map(([username]) => [
          username,
          getPercentage(userList.length),
        ]),
      );
    }
  }, [evenlyDistributed]);

  const getPercentage = (size: number) => {
    return Number(((1 / size) * 100).toFixed(2));
  };

  const handleAddUser = () => {
    let percentage = 0;
    if (evenlyDistributed) {
      percentage = getPercentage(userList.length + 1);
      setUserList((prevList) =>
        prevList.map(([username]) => [username, percentage]),
      );
    }
    setUserList((prevList) => [...prevList, ['', percentage]]);
  };

  const handleDeleteUser = () => {
    if (evenlyDistributed) {
      setUserList((prevList) =>
        prevList.map(([username]) => [
          username,
          getPercentage(userList.length - 1),
        ]),
      );
    }
    setUserList((prevList) => prevList.slice(0, prevList.length - 1));
  };

  const handleUserInput = (
    input: string | number,
    index: number,
    place: number,
  ) => {
    const updatedUserList = [...userList];
    updatedUserList[index][place] = input;
    setUserList(updatedUserList);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{'Create Group Split'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            />
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
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {capitalizeWord(category)}
                </MenuItem>
              ))}
            </TextField>
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
            />

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
                    label={`User ${index + 1}`}
                    type="text"
                    value={values[0] || ''}
                    style={{ width: '70%' }}
                    onChange={(event) =>
                      handleUserInput(event.target.value, index, 0)
                    }
                  />
                  <TextField
                    disabled={evenlyDistributed}
                    label={`Percentage Amount ${index + 1}`}
                    type="number"
                    value={values[1] || ''}
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
                      (formik.values.amount * (values[1] / 100)).toFixed(2) ||
                      ''
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
          </Box>
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
