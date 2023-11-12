import * as React from 'react';
import { Typography } from '@mui/material';

import { PrimaryDiv } from '../../assets/styles';
import Header from '../../components/Header';
import { MonthlyExpensesGraph } from './components/MonthlyExpensesGraph';
import { CategoryGraph } from './components/CategoryGraph';
import { CompareGraph } from './components/CompareGraph';
import {
  AnalyticsBox,
  DailyAndCategoryBox,
  AnalyticsSubBox,
  CompareGraphBox,
} from './styles';

/**
 * Analytics page component
 *
 * @returns {JSX.Element} - analytics page
 */
const Analytics = (): JSX.Element => {
  return (
    <PrimaryDiv>
      <Header />
      <AnalyticsBox>
        <AnalyticsSubBox>
          <Typography variant="h4" align="center">
            This month
          </Typography>
          <DailyAndCategoryBox>
            <MonthlyExpensesGraph />
            <CategoryGraph />
          </DailyAndCategoryBox>
        </AnalyticsSubBox>
        <AnalyticsSubBox>
          <Typography variant="h4" align="center">
            Compare Months
          </Typography>
          <CompareGraphBox>
            <CompareGraph />
          </CompareGraphBox>
        </AnalyticsSubBox>
      </AnalyticsBox>
    </PrimaryDiv>
  );
};

export default Analytics;
