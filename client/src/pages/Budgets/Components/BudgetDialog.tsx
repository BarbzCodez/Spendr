import React, { useEffect, FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  BudgetUIData,
  BudgetDialogProps,
} from '../../../interfaces/budgetInterfaces';
import { PrimaryButton } from '../../../assets/styles';
import { duration, categories } from '../../../assets/constants';
import { capitalizeWord } from '../../../assets/utils';

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Amount must be a valid number')
    .positive('Amount must be greater than 0')
    .required('Amount cannot be empty'),
  duration: yup.string().oneOf(duration).required('Duration cannot be empty'),
  category: yup.string().oneOf(categories).required('Category cannot be empty'),
});

/**
 * Budget dialog component
 *
 * @property {boolean} open - open/closed state of the dialog
 * @property {function} onClose - function when cancel is clicked when adding a budget
 * @property {function} onAdd - function when add a new budget is clicked
 * @property {function} onEdit - function when edit is clicked
 * @property {budgetData} budgetData - budget data when editing
 *
 * @returns {JSX.Element} - expense dialog component
 */
const BudgetDialog: FC<BudgetDialogProps> = ({
  open,
  onClose,
  onAdd,
  onEdit,
  budgetData,
}): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      amount: budgetData?.amount || 0,
      duration: budgetData?.duration || 'WEEKLY',
      category: budgetData?.category,
    },
    validationSchema: validationSchema,
    onSubmit: (values: BudgetUIData) => {
      if (budgetData) {
        onEdit({
          id: budgetData.id,
          userId: budgetData.userId,
          amount: values.amount,
          duration: values.duration,
          category: values.category,
          totalExpense: budgetData.totalExpense,
        });
      } else {
        onAdd({
          amount: values.amount,
          duration: values.duration,
          category: values.category,
        });
      }
    },
  });

  useEffect(() => {
    if (budgetData) {
      formik.setFieldValue('amount', budgetData.amount);
      formik.setFieldValue('duration', budgetData.duration);
      formik.setFieldValue('category', budgetData.category);
    }
  }, [budgetData]);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{budgetData ? 'Edit Budget' : 'Add Budget'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              id="duration"
              label="Duration"
              variant="filled"
              value={formik.values.duration}
              onChange={(event) => {
                event.target.name = 'duration';
                formik.handleChange(event);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              helperText={
                formik.touched.duration && Boolean(formik.errors.duration)
                  ? formik.errors.duration
                  : ' '
              }
              style={{ width: 300 }}
            >
              {duration.map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration.charAt(0).toUpperCase() +
                    duration.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              id="category"
              label="Category"
              variant="filled"
              value={formik.values.category}
              defaultValue={budgetData?.category}
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

export default BudgetDialog;
