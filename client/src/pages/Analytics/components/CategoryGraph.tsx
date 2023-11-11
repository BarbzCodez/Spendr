import * as React from 'react';
import { BackgroundBox } from './styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

import { useUser } from '../../../context/UserContext';
import { categoryTotalExpensesRequest } from '../../../api/UserAPI';

/**
 * Category graph component
 *
 * @returns {JSX.Element} - category graph
 */
export const CategoryGraph: React.FC = () => {
  const { userId, token } = useUser();
  const [categoryTotals, setCategoryTotals] = React.useState<
    { category: string; amount: number }[]
  >([]);
  const [errorMsg, setErrorMsg] = React.useState('No data to show');
  const currDate = new Date();
  const startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);

  React.useEffect(() => {
    fetchCategoryExpenses(startDate.toISOString(), currDate.toISOString());
  }, []);

  const fetchCategoryExpenses = async (startDate: string, endDate: string) => {
    try {
      if (userId != null && token != null) {
        const response = await categoryTotalExpensesRequest(
          { userId, token },
          { startDate, endDate },
        );

        if (response.status === 200) {
          const totals: { category: string; amount: number }[] =
            response.data.data;
          setCategoryTotals(totals);

          if (categoryTotals.length == 0) {
            setErrorMsg('No data to show');
          }
        }
      }
    } catch (error) {
      setErrorMsg('Error fetching data');
    }
  };

  return (
    <BackgroundBox>
      {categoryTotals.length != 0 && (
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
      )}
      {categoryTotals.length == 0 && (
        <Typography variant="body1" align="center">
          {errorMsg}
        </Typography>
      )}
    </BackgroundBox>
  );
};
