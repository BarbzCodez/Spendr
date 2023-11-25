import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const BudgetsBox = styled(Box)(({ theme }) => ({
  width: '50%',
  height: '70vh',
  padding: '2rem',
  backgroundColor: `${theme.palette.secondary.main}80`,
  borderRadius: '16px',
}));
