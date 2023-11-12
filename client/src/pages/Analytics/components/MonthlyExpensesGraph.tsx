import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { format } from 'date-fns';
import { Typography } from '@mui/material';

import { BackgroundBox } from './styles';
import { useUser } from '../../../context/UserContext';
import { dailyTotalExpensesRequest } from '../../../api/UserAPI';
import { DailyTotal } from '../../../interfaces/interfaces';

/**
 * Daily expenses graph component
 *
 * @returns {JSX.Element} - daily expenses graph
 */
export const MonthlyExpensesGraph = (): JSX.Element => {
  const { userId, token } = useUser();
  const [accumulatedTotals, setAccumulatedTotals] = React.useState<
    { date: Date; accumulatedAmount: number }[]
  >([]);
  const [errorMsg, setErrorMsg] = React.useState('Loading...');

  const currDate = new Date();
  const startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
  const endDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    0,
    12,
  );

  React.useEffect(() => {
    fetchDailyExpenses(startDate.toISOString(), currDate.toISOString());
  }, []);

  const fetchDailyExpenses = async (startDate: string, endDate: string) => {
    try {
      if (userId != null && token != null) {
        const response = await dailyTotalExpensesRequest(
          { userId, token },
          { startDate, endDate },
        );

        if (response.status === 200) {
          const totals: [DailyTotal] = response.data.data;
          calcAndSetAccumulatedTotals(totals);

          if (accumulatedTotals.length == 0) {
            setErrorMsg('No data to show');
          }
        }
      }
    } catch (error) {
      setErrorMsg('Error fetching data');
    }
  };

  const calcAndSetAccumulatedTotals = (dailyTotals: [DailyTotal]) => {
    const datesMap = new Map<string, number>();
    const startDate = new Date(
      parseInt(dailyTotals[0].date.split('-')[0]),
      parseInt(dailyTotals[0].date.split('-')[1]) - 1,
      1,
    );
    const endDate = new Date(
      parseInt(dailyTotals[0].date.split('-')[0]),
      parseInt(dailyTotals[0].date.split('-')[1]),
      0,
    );

    dailyTotals.forEach(({ date, amount }) => {
      datesMap.set(date, amount);
    });

    const currentDate = startDate;
    while (currentDate <= endDate) {
      const currentDateStr = currentDate.toISOString().split('T')[0];
      if (!datesMap.has(currentDateStr)) {
        datesMap.set(currentDateStr, 0);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const allTotals = Array.from(datesMap, ([date, amount]) => ({
      date: new Date(`${date}T12:00:00Z`),
      amount: amount,
    }));
    allTotals.sort((x, y) => (x.date > y.date ? 1 : -1));

    let accumulatedAmount = 0;
    const accumulatedResult = allTotals.map(({ date, amount }) => {
      accumulatedAmount += amount;
      return { date, accumulatedAmount };
    });

    setAccumulatedTotals(accumulatedResult);
  };

  return (
    <BackgroundBox>
      {accumulatedTotals.length != 0 && (
        <LineChart
          xAxis={[
            {
              dataKey: 'date',
              valueFormatter: (v) => format(v, 'yyyy/MM/dd'),
              min: startDate,
              max: endDate,
            },
          ]}
          series={[
            {
              dataKey: 'accumulatedAmount',
              label: 'Total Monthly Expenses',
              color: '#FFB7B2',
              showMark: true,
            },
          ]}
          dataset={accumulatedTotals}
        />
      )}
      {accumulatedTotals.length == 0 && (
        <Typography variant="body1" align="center">
          {errorMsg}
        </Typography>
      )}
    </BackgroundBox>
  );
};
