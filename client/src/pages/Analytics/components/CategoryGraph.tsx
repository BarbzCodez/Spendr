import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import { useUser } from '../../../context/UserContext';
import { categoryTotalExpensesRequest } from '../../../api/UserAPI';
import {
  categories,
  categoryGraphColors,
} from '../../../assets/constants/constants';
import {
  BackgroundBox,
  DataHorizontalBox,
  CategoriesLegendBox,
} from './styles';
import { capitalizeWord } from '../../../assets/utils';

/**
 * Category graph component
 *
 * @returns {JSX.Element} - category graph
 */
export const CategoryGraph = (): JSX.Element => {
  const { userId, token } = useUser();
  const [categoryTotals, setCategoryTotals] = useState<
    { id: number; value: number; label: string }[]
  >([]);
  const [errorState, setErrorState] = useState(false);
  const currDate = new Date();
  const startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);

  useEffect(() => {
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
        }
      }
    } catch (error) {
      setErrorState(true);
    }
  };

  const processData = (
    totals: { category: string; amount: number }[],
  ): { id: number; value: number; label: string }[] => {
    const categoryMap = new Map(
      totals.map((item) => [item.category, item.amount]),
    );
    const processedData = categories.map((category, index) => ({
      id: index,
      value: categoryMap.get(category) || 0,
      label: category,
    }));

    return processedData;
  };

  const getCategoriesLegend = () => {
    return (
      <CategoriesLegendBox>
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <CircleIcon style={{ color: categoryGraphColors[index] }} />
            <Typography
              variant="body1"
              align="center"
              sx={{
                '@media (max-width:1000px)': {
                  fontSize: '0.7rem',
                },
              }}
            >
              {capitalizeWord(category)}
            </Typography>
          </Box>
        ))}
      </CategoriesLegendBox>
    );
  };

  return (
    <BackgroundBox boxShadow={3}>
      {!errorState && categoryTotals.length != 0 && (
        <DataHorizontalBox>
          <Box sx={{ flex: 1 }}>
            <PieChart
              colors={categoryGraphColors}
              series={[
                {
                  data: categoryTotals,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                },
              ]}
              height={200}
              margin={{ right: 5 }}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          </Box>
          {getCategoriesLegend()}
        </DataHorizontalBox>
      )}
      {!errorState && categoryTotals.length == 0 && (
        <Typography variant="body1" align="center">
          Fetching data...
        </Typography>
      )}
      {errorState && (
        <Typography variant="body1" align="center">
          Error loading data. Please reload.
        </Typography>
      )}
    </BackgroundBox>
  );
};
