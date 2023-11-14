import { styled, Box } from '@mui/system';

export const BackgroundBox = styled(Box)(({ theme }) => ({
  width: '48%',
  height: '35vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '2vh 2vw',
  backgroundColor: `${theme.palette.secondary.main}80`,
  borderRadius: '16px',
}));

export const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
});

export const ComparisonGraphBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  height: '80%',
});

export const DataHorizontalBox = styled(Box)({
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'row',
});

export const CategoriesLegendBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
});
