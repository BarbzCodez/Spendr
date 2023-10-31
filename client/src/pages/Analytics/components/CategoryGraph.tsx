import * as React from 'react';
import { BackgroundBox } from './styles';
import { BarChart } from '@mui/x-charts/BarChart';

const categoryTotals = [
  { category: 'GROCERIES', amount: 430.23 },
  { category: 'TRANSPORT', amount: 45.67 },
  { category: 'ENTERTAINMENT', amount: 76.21 },
  { category: 'HEALTH', amount: 32.87 },
  { category: 'UTILITIES', amount: 634.38 },
  { category: 'OTHER', amount: 249.23 },
];

/**
 * Category graph component
 *
 * @returns {JSX.Element} - category graph
 */
export const CategoryGraph: React.FC = () => {
  return (
    <BackgroundBox>
      <BarChart
        xAxis={[
          {
            dataKey: 'category',
            scaleType: 'band',
          },
        ]}
        series={[
          {
            dataKey: 'amount',
            label: 'Total Expense',
            color: '#85D3C3',
          },
        ]}
        dataset={categoryTotals}
      />
    </BackgroundBox>
  );
};
