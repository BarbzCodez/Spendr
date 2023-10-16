import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ExpenseData, ExpenseDialogProps } from '../../interfaces/interfaces';
import { theme } from '../../assets/styles';
import { PrimaryButton } from '../../assets/styles/styles';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title cannot be empty'),
  amount: yup
    .number()
    .typeError('Amount must be a valid number')
    .positive('Amount must be greater than 0')
    .required('Amount cannot be empty'),
  category: yup.string().required('Category cannot be empty'),
});

const ExpenseDialog: React.FC<ExpenseDialogProps> = ({
  open,
  onClose,
  onSave,
  expenseData,
}) => {
  const formik = useFormik({
    initialValues: {
      title: expenseData?.title || '',
      amount: expenseData?.amount || 0,
      category: expenseData?.category || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: ExpenseData) => {
      return;
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {expenseData ? 'Edit Expense' : 'Add Expense'}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            style={{ width: 550 }}
            fullWidth
            variant="filled"
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={
              formik.touched.title && Boolean(formik.errors.title)
                ? formik.errors.title
                : ' '
            }
            inputProps={{
              style: { color: theme.palette.primary.contrastText },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.contrastText },
            }}
          />
          <TextField
            id="amount"
            label="Amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            fullWidth
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            inputProps={{
              style: { color: theme.palette.primary.contrastText },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.contrastText },
            }}
            style={{ width: 550 }}
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
            value={formik.values.category}
            onChange={(event) => {
              event.target.name = 'category';
              formik.handleChange(event);
            }}
            inputProps={{
              style: { color: theme.palette.primary.contrastText },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.contrastText },
            }}
            variant="filled"
            style={{ width: 550 }}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={
              formik.touched.category && Boolean(formik.errors.category)
                ? formik.errors.category
                : ' '
            }
          >
            <MenuItem value="GROCERIES" key="GROCERIES">
              Groceries
            </MenuItem>
            <MenuItem value="TRANSPORT" key="TRANSPORT">
              Transport
            </MenuItem>
            <MenuItem value="ENTERTAINMENT" key="ENTERTAINMENT">
              Entertainment
            </MenuItem>
            <MenuItem value="HEALTH" key="HEALTH">
              Health
            </MenuItem>
            <MenuItem value="UTILITIES" key="UTILITIES">
              Utilities
            </MenuItem>
            <MenuItem value="OTHER" key="OTHER">
              Other
            </MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={onClose}>Cancel</PrimaryButton>
          <PrimaryButton type="submit" color="primary">
            Save
          </PrimaryButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseDialog;
