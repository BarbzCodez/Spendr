import React, { useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  MenuItem,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ExpenseUIData, ExpenseDialogProps } from '../../interfaces/interfaces';
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

/**
 * Expense dialog component
 *
 * @param {boolean} open - open/closed state of the dialog
 * @param {function} onClose - function when cancel is clicked
 * @param {function} onSave - function when save is clicked
 * @param {ExpenseVals} expenseData - expense data when editting
 * @returns {React.FC} - expense dialog component
 */
const ExpenseDialog: React.FC<ExpenseDialogProps> = ({
  open,
  onClose,
  onAdd,
  onEdit,
  expenseData,
}) => {
  const formik = useFormik({
    initialValues: {
      title: expenseData?.title || '',
      amount: expenseData?.amount || 0,
      category: expenseData?.category || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: ExpenseUIData) => {
      if (expenseData) {
        onEdit({
          id: expenseData.id,
          userId: expenseData.userId,
          title: values.title,
          amount: values.amount,
          category: values.category,
          createdAt: expenseData.createdAt,
        });
      } else {
        onAdd(values);
      }
    },
  });

  useEffect(() => {
    if (expenseData) {
      formik.setFieldValue('title', expenseData.title);
      formik.setFieldValue('amount', expenseData.amount);
      formik.setFieldValue('category', expenseData.category);
    }
  }, [expenseData]);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

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
            variant="filled"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={
              formik.touched.title && Boolean(formik.errors.title)
                ? formik.errors.title
                : ' '
            }
            style={{ width: 550 }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body1">$</Typography>
                </InputAdornment>
              ),
            }}
            style={{ width: 550 }}
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
            style={{ width: 550 }}
          >
            <MenuItem value="GROCERIES" key="GROCERIES" color="#FFFFFF">
              GROCERIES
            </MenuItem>
            <MenuItem value="TRANSPORT" key="TRANSPORT">
              TRANSPORT
            </MenuItem>
            <MenuItem value="ENTERTAINMENT" key="ENTERTAINMENT">
              ENTERTAINMENT
            </MenuItem>
            <MenuItem value="HEALTH" key="HEALTH">
              HEALTH
            </MenuItem>
            <MenuItem value="UTILITIES" key="UTILITIES">
              UTILITIES
            </MenuItem>
            <MenuItem value="OTHER" key="OTHER">
              OTHER
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
