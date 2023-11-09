import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { format } from 'date-fns';

import { BackgroundBox } from './styles';
import { useUser } from '../../../context/UserContext';
import { dailyTotalExpensesRequest } from '../../../api/UserAPI';
import { DailyTotal } from '../../../interfaces/interfaces';

/**
 * Daily expenses graph component
 *
 * @returns {JSX.Element} - daily expenses graph
 */
export const DailyExpenseGraph = (): JSX.Element => {
  const { userId, token } = useUser();
  const [dailyTotals, setDailyTotals] = React.useState<
    { date: Date; amount: number }[]
  >([]);

  const currDate = new Date();
  const firstDateOFMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    1,
  );

  React.useEffect(() => {
    fetchDailyExpenses(firstDateOFMonth.toISOString(), currDate.toISOString());
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
          const totalsWithDates: { date: Date; amount: number }[] = totals.map(
            (item) => ({
              ...item,
              date: new Date(`${item.date}T12:00:00Z`),
            }),
          );
          setDailyTotals(totalsWithDates);
        }
      }
    } catch (error) {}
  };

  return (
    <BackgroundBox>
      <LineChart
        xAxis={[
          {
            dataKey: 'date',
            valueFormatter: (v) => format(v, 'yyyy/MM/dd'),
            min: firstDateOFMonth,
            max: currDate,
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
        dataset={dailyTotals}
      />
    </BackgroundBox>
  );
};
