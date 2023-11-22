import { styled, Stack } from '@mui/system';

export const SettingsStack = styled(Stack)(({ theme }) => ({
  width: '50%',
  height: '70vh',
  padding: '2rem',
  backgroundColor: `${theme.palette.secondary.main}80`,
  borderRadius: '16px',
}));
