import React, { useEffect, useState, FC, ChangeEvent } from 'react';
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
import { Upload } from '@mui/icons-material';

import {
  ExpenseUIData,
  ExpenseDialogProps,
} from '../../../interfaces/expenseInterfaces';
import { PrimaryButton, PrimaryLoadingButton } from '../../../assets/styles';
import { getReceiptData } from '../../../api/EdenAPI';
import { categories } from '../../../assets/constants';
import { capitalizeWord, isoToFormattedDate } from '../../../assets/utils';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title cannot be empty'),
  amount: yup
    .number()
    .typeError('Amount must be a valid number')
    .positive('Amount must be greater than 0')
    .required('Amount cannot be empty'),
  category: yup.string().required('Category cannot be empty'),
  createdAt: yup
    .string()
    .matches(
      /^(?:20\d{2}|19\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      'Date must be in valid YYYY/MM/DD format',
    )
    .required('Date cannot be empty'),
});

/**
 * Expense dialog component
 *
 * @property {boolean} open - open/closed state of the dialog
 * @property {function} onClose - function when cancel is clicked when adding a expense
 * @property {function} onAdd - function when add a new expense is clicked
 * @property {function} onEdit - function when edit is clicked
 * @property {budgetData} expenseData - budget data when editing
 *
 * @returns {JSX.Element} - expense dialog component
 */
const ExpenseDialog: FC<ExpenseDialogProps> = ({
  open,
  onClose,
  onAdd,
  onEdit,
  expenseData,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: expenseData?.title || '',
      amount: expenseData?.amount || 0,
      category: expenseData?.category || '',
      createdAt: expenseData
        ? isoToFormattedDate(expenseData.createdAt)
        : isoToFormattedDate(new Date().toISOString()),
    },
    validationSchema: validationSchema,
    onSubmit: (values: ExpenseUIData) => {
      const [year, month, day] = values.createdAt.split('/');
      const date = new Date(Number(year), Number(month) - 1, Number(day));

      if (expenseData) {
        onEdit({
          id: expenseData.id,
          userId: expenseData.userId,
          title: values.title,
          amount: values.amount,
          category: values.category,
          createdAt: date.toISOString(),
        });
      } else {
        onAdd({
          title: values.title,
          amount: values.amount,
          category: values.category,
          createdAt: date.toISOString(),
        });
      }
    },
  });

  useEffect(() => {
    if (expenseData) {
      formik.setFieldValue('title', expenseData.title);
      formik.setFieldValue('amount', expenseData.amount);
      formik.setFieldValue('category', expenseData.category);
      formik.setFieldValue(
        'createdAt',
        isoToFormattedDate(expenseData.createdAt),
      );
    }
  }, [expenseData]);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  const handleImageUpload = async (file: File) => {
    setLoading(true);

    try {
      const { title, amount, date } = await getReceiptData(file);
      formik.setFieldValue('title', title);
      formik.setFieldValue('amount', amount);
      formik.setFieldValue('createdAt', date);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleReceiptUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      handleImageUpload(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('receipt-input')?.click();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {expenseData ? 'Edit Expense' : 'Add Expense'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
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
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              justifyContent: 'center',
              padding: '10px',
              alignItems: 'space-between',
              flex: 1,
            }}
          >
            <input
              id="receipt-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleReceiptUpload}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'left',
                flex: 1,
              }}
            >
              {!expenseData && open && (
                <PrimaryLoadingButton
                  onClick={triggerFileInput}
                  loading={loading}
                  loadingPosition="start"
                  loadingIndicator="Processing..."
                  startIcon={<Upload />}
                  variant="outlined"
                  sx={{ width: '200px' }}
                >
                  {!loading && 'Upload Receipt'}
                </PrimaryLoadingButton>
              )}
            </Box>
            <PrimaryButton onClick={onClose}>Cancel</PrimaryButton>
            <PrimaryButton type="submit" color="primary">
              Save
            </PrimaryButton>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseDialog;
