import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { format } from 'date-fns';

import { BackgroundBox } from './styles';

const dailyTotals = [
  { date: '2023-10-01', amount: 45.25 },
  { date: '2023-10-02', amount: 58.75 },
  { date: '2023-10-03', amount: 32.4 },
  { date: '2023-10-04', amount: 70.1 },
  { date: '2023-10-05', amount: 39.9 },
  { date: '2023-10-06', amount: 55.6 },
  { date: '2023-10-07', amount: 47.8 },
  { date: '2023-10-08', amount: 62.3 },
  { date: '2023-10-09', amount: 38.5 },
  { date: '2023-10-10', amount: 49.2 },
  { date: '2023-10-11', amount: 67.1 },
  { date: '2023-10-12', amount: 53.75 },
  { date: '2023-10-13', amount: 29.6 },
  { date: '2023-10-14', amount: 42.9 },
  { date: '2023-10-15', amount: 51.4 },
  { date: '2023-10-16', amount: 59.2 },
  { date: '2023-10-17', amount: 64.7 },
  { date: '2023-10-18', amount: 36.8 },
  { date: '2023-10-19', amount: 48.9 },
  { date: '2023-10-20', amount: 44.1 },
  { date: '2023-10-21', amount: 52.4 },
  { date: '2023-10-22', amount: 61.6 },
  { date: '2023-10-23', amount: 33.7 },
  { date: '2023-10-24', amount: 46.8 },
  { date: '2023-10-25', amount: 38.2 },
  { date: '2023-10-26', amount: 50.3 },
  { date: '2023-10-27', amount: 55.4 },
  { date: '2023-10-28', amount: 69.8 },
  { date: '2023-10-29', amount: 42.9 },
  { date: '2023-10-30', amount: 60.1 },
  { date: '2023-10-31', amount: 37.5 },
];

/**
 * Daily expenses graph component
 *
 * @returns {JSX.Element} - daily expenses graph
 */
export const DailyExpenseGraph: React.FC = () => {
  const dailyTotalsWithDateObjects: { date: Date; amount: number }[] =
    dailyTotals.map((item) => ({
      ...item,
      date: new Date(`${item.date}T12:00:00Z`),
    }));

  return (
    <BackgroundBox>
      <LineChart
        xAxis={[
          {
            dataKey: 'date',
            valueFormatter: (v) => format(v, 'yyyy/MM/dd'),
            min: new Date('2023-10-01T00:00:00'),
            max: new Date('2023-11-01T00:00:00'),
          },
        ]}
        series={[
          {
            dataKey: 'amount',
            label: 'Daily Total Expense',
            color: '#FFB7B2',
            showMark: true,
          },
        ]}
        dataset={dailyTotalsWithDateObjects}
      />
    </BackgroundBox>
  );
};
