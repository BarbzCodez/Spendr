import * as React from 'react';
import { BackgroundBox } from './styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

import { useUser } from '../../../context/UserContext';
import { categoryTotalExpensesRequest } from '../../../api/UserAPI';

const allCategories = [
  'GROCERIES',
  'TRANSPORT',
  'ENTERTAINMENT',
  'HEALTH',
  'UTILITIES',
  'OTHER',
];

/**
 * Category graph component
 *
 * @returns {JSX.Element} - category graph
 */
export const CategoryGraph: React.FC = () => {
  const { userId, token } = useUser();
  const [categoryTotals, setCategoryTotals] = React.useState<
    { id: number; value: number; label: string }[]
  >([]);
  const [errorMsg, setErrorMsg] = React.useState('Loading...');
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
          const processedTotals = processData(totals);
          setCategoryTotals(processedTotals);

          if (categoryTotals.length == 0) {
            setErrorMsg('No data to show');
          }
        }
      }
    } catch (error) {
      setErrorMsg('Error fetching data');
    }
  };

  const processData = (
    totals: { category: string; amount: number }[],
  ): { id: number; value: number; label: string }[] => {
    const categoryMap = new Map(
      totals.map((item) => [item.category, item.amount]),
    );
    const processedData = allCategories.map((category, index) => ({
      id: index,
      value: categoryMap.get(category) || 0,
      label: category,
    }));

    return processedData;
  };

  return (
    <BackgroundBox>
      {categoryTotals.length != 0 && (
        <PieChart
          colors={[
            '#FFB7B2',
            '#B2FFCC',
            '#EBB2FF',
            '#FFF3B2',
            '#FFB2E5',
            '#B2C3FF',
          ]}
          series={[
            {
              data: categoryTotals,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30 },
            },
          ]}
          height={250}
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
