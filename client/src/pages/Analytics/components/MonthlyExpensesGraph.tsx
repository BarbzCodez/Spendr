import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { format } from 'date-fns';
import { Typography } from '@mui/material';

import { BackgroundBox } from './styles';
import { useUser } from '../../../context/UserContext';
import { dailyTotalExpensesRequest } from '../../../api/UserAPI';
import { DailyTotal } from '../../../interfaces/generalInterfaces';
import { categoryGraphColors } from '../../../assets/constants';

/**
 * Monthly expenses graph component
 *
 * @returns {JSX.Element} - monthly expenses graph
 */
export const MonthlyExpensesGraph = (): JSX.Element => {
  const { userId, token } = useUser();
  const [accumulatedTotals, setAccumulatedTotals] = useState<
    { date: Date; accumulatedAmount: number }[]
  >([]);
  const [errorState, setErrorState] = useState(false);

  const currDate = new Date();
  const startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
  const endDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    0,
    12,
  );

  useEffect(() => {
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
          calcAndSetAccumulatedTotals(totals, startDate, endDate);
        }
      }
    } catch (error) {
      setErrorState(true);
    }
  };

  const calcAndSetAccumulatedTotals = (
    dailyTotals: DailyTotal[],
    startDateStr: string,
    endDateStr: string,
  ) => {
    const datesMap = new Map<string, number>();
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (dailyTotals.length != 0) {
      dailyTotals.forEach(({ date, amount }) => {
        datesMap.set(date, amount);
      });
    }

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
    <BackgroundBox boxShadow={3}>
      {!errorState && accumulatedTotals.length != 0 && (
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
              color: categoryGraphColors[0],
              showMark: true,
            },
          ]}
          dataset={accumulatedTotals}
        />
      )}
      {!errorState && accumulatedTotals.length == 0 && (
        <Typography variant="body1" align="center">
          Fetching data...
        </Typography>
      )}
      {errorState && (
        <Typography variant="body1" align="center">
          Error fetching data. Please reload.
        </Typography>
      )}
    </BackgroundBox>
  );
};
