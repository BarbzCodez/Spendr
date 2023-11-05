import { styled, Box } from '@mui/system';

export const AnalyticsBox = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
});

export const AnalyticsSubBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 3vw',
  justifyContent: 'center',
  alignContent: 'center',
});

export const DailyAndCategoryBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const CompareGraphBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});
