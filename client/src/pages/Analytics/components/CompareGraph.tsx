import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { MenuItem, TextField, Typography, Stack } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { BackgroundBox, CenteredBox, ComparisonGraphBox } from './styles';
import { dailyTotalExpensesRequest } from '../../../api/UserAPI';
import { useUser } from '../../../context/UserContext';
import { DailyTotal } from '../../../interfaces/interfaces';

const firstColor = '#C353DB';
const secondColor = '#F1E194';

/**
 * Comparison graph component
 *
 * @returns {JSX.Element} - comparison graph
 */
export const CompareGraph: React.FC = () => {
  const { userId, token } = useUser();
  const [firstMonthIndex, setFirstMonthIndex] = useState(0);
  const [secondMonthIndex, setSecondMonthIndex] = useState(1);
  const [firstMonthData, setFirstMonthData] = useState<
    { date: string; amount: number }[]
  >([]);
  const [secondMonthData, setSecondMonthData] = useState<
    { date: string; amount: number }[]
  >([]);
  const [combinedData, setCombinedData] = useState<
    { day: number; firstAmount: number; secondAmount: number }[]
  >([]);
  const [errorMsg, setErrorMsg] = React.useState('Loading...');
  const monthsArray = (() => {
    const currDate = new Date();
    const currMonth = currDate.getMonth();
    const currYear = currDate.getFullYear();
    const monthCount = 12;
    const result = [];

    for (let i = 1; i <= monthCount; i++) {
      const month = (currMonth - i + monthCount) % monthCount;
      const year = month < currMonth ? currYear : currYear - 1;
      const monthString = new Date(year, month).toLocaleString('default', {
        month: 'short',
      });

      result.push({
        month: month,
        year: year,
        text: `${monthString} ${year}`,
      });
    }

    return result;
  })();

  React.useEffect(() => {
    const setMonthsData = async () => {
      await setMonthlyData(firstMonthIndex, setFirstMonthData);
      await setMonthlyData(secondMonthIndex, setSecondMonthData);
    };

    setMonthsData();
  }, []);

  React.useEffect(() => {
    const updateData = async () => {
      await setMonthlyData(firstMonthIndex, setFirstMonthData);
    };

    updateData();
  }, [firstMonthIndex]);

  React.useEffect(() => {
    const updateData = async () => {
      await setMonthlyData(secondMonthIndex, setSecondMonthData);
    };

    updateData();
  }, [secondMonthIndex]);

  React.useEffect(() => {
    if (firstMonthData.length != 0 && secondMonthData.length != 0) {
      calcAndSetCombinedData();
    }
  }, [firstMonthData, secondMonthData]);

  const setMonthlyData = async (
    index: number,
    setFunc: React.Dispatch<
      React.SetStateAction<
        {
          date: string;
          amount: number;
        }[]
      >
    >,
  ) => {
    const monthYear = monthsArray[index];
    const startDate = new Date(monthYear.year, monthYear.month, 1);
    const endDate = new Date(monthYear.year, monthYear.month + 1, 0);

    await fetchDailyExpenses(
      startDate.toISOString(),
      endDate.toISOString(),
      setFunc,
    );
  };

  const fetchDailyExpenses = async (
    startDate: string,
    endDate: string,
    setData: React.Dispatch<
      React.SetStateAction<
        {
          date: string;
          amount: number;
        }[]
      >
    >,
  ) => {
    try {
      if (userId != null && token != null) {
        const response = await dailyTotalExpensesRequest(
          { userId, token },
          { startDate, endDate },
        );

        if (response.status === 200) {
          const totals: [DailyTotal] = response.data.data;
          const totalsWithDates: { date: string; amount: number }[] =
            getTotalsWithDates(totals);
          totalsWithDates.sort((x, y) => (x.date > y.date ? 1 : -1));
          setData(totalsWithDates);

          if (totalsWithDates.length == 0) {
            setErrorMsg(
              'At least one of the months does not have data to show',
            );
          }
        }
      }
    } catch (error) {
      setErrorMsg('Error fetching data');
    }
  };

  const getTotalsWithDates = (totals: [DailyTotal]) => {
    const datesMap = new Map<string, number>();
    const startDate = new Date(
      parseInt(totals[0].date.split('-')[0]),
      parseInt(totals[0].date.split('-')[1]) - 1,
      1,
    );
    const endDate = new Date(
      parseInt(totals[0].date.split('-')[0]),
      parseInt(totals[0].date.split('-')[1]),
      0,
    );

    totals.forEach(({ date, amount }) => {
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

    const result = Array.from(datesMap, ([date, amount]) => ({
      date: date,
      amount: amount,
    }));
    return result;
  };

  const calcAndSetCombinedData = () => {
    const maxLength = Math.max(firstMonthData.length, secondMonthData.length);
    const combinedData = Array.from({ length: maxLength }, (_, index) => {
      const firstEntry = firstMonthData[index] || { amount: 0 };
      const secondEntry = secondMonthData[index] || { amount: 0 };
      const day = index + 1;

      return {
        day,
        firstAmount: firstEntry.amount,
        secondAmount: secondEntry.amount,
      };
    });

    setCombinedData(combinedData);
  };

  const getAverage = (data: { date: string; amount: number }[]) => {
    const totalAmount = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
    return totalAmount / data.length;
  };

  const getComparisonInfo = () => {
    const firstMonthAvg = Number(getAverage(firstMonthData));
    const secondMonthAvg = Number(getAverage(secondMonthData));
    const percentageChange = Math.abs(
      ((secondMonthAvg - firstMonthAvg) / firstMonthAvg) * 100,
    ).toFixed(2);
    const isDecrease = firstMonthAvg >= secondMonthAvg;

    const averageText = (
      monthString: string,
      average: number,
      color: string,
    ) => {
      return (
        <Stack
          style={{
            width: 125,
            marginBottom: 15,
          }}
        >
          <Typography variant="body1" align="center" style={{ color: color }}>
            {monthString}
          </Typography>
          <Typography variant="body1" align="center">
            average: {average.toFixed(2)}
          </Typography>
        </Stack>
      );
    };

    return (
      <CenteredBox
        style={{
          flexDirection: 'column',
        }}
      >
        {averageText(
          monthsArray[firstMonthIndex].text,
          firstMonthAvg,
          firstColor,
        )}
        {averageText(
          monthsArray[secondMonthIndex].text,
          secondMonthAvg,
          secondColor,
        )}

        <CenteredBox
          style={{
            flexDirection: 'row',
          }}
        >
          {isDecrease ? (
            <ArrowDownward sx={{ color: 'green' }} />
          ) : (
            <ArrowUpward sx={{ color: 'red' }} />
          )}

          <Typography variant="body1">{percentageChange}%</Typography>
        </CenteredBox>
      </CenteredBox>
    );
  };

  const changeFirstMonthIndex = (newVal: number) => {
    setFirstMonthIndex(newVal);
  };

  const changeSecondMonthIndex = (newVal: number) => {
    setSecondMonthIndex(newVal);
  };

  return (
    <BackgroundBox style={{ width: '100%' }}>
      <CenteredBox>
        <TextField
          select
          id="month1"
          label="Month 1"
          size="small"
          value={firstMonthIndex}
          onChange={(e) =>
            changeFirstMonthIndex(e.target.value as unknown as number)
          }
          style={{ margin: '0 2vw', marginTop: '1vh' }}
          InputLabelProps={{
            style: { color: firstColor },
          }}
        >
          {monthsArray.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.text}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          id="month2"
          label="Month 2"
          size="small"
          value={secondMonthIndex}
          onChange={(e) =>
            changeSecondMonthIndex(e.target.value as unknown as number)
          }
          style={{ margin: '0 2vw', marginTop: '1vh' }}
          InputLabelProps={{
            style: { color: secondColor },
          }}
        >
          {monthsArray.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.text}
            </MenuItem>
          ))}
        </TextField>
      </CenteredBox>
      {combinedData.length != 0 && (
        <ComparisonGraphBox>
          <BarChart
            xAxis={[
              {
                dataKey: 'day',
                min: 1,
                max: 31,
                scaleType: 'band',
              },
            ]}
            series={[
              {
                dataKey: 'firstAmount',
                label: `${monthsArray[firstMonthIndex].text} Daily Total Expense`,
                color: firstColor,
              },
              {
                dataKey: 'secondAmount',
                label: `${monthsArray[secondMonthIndex].text} Daily Total Expense`,
                color: secondColor,
              },
            ]}
            dataset={combinedData}
          />
          {getComparisonInfo()}
        </ComparisonGraphBox>
      )}
      {combinedData.length == 0 && (
        <Typography variant="body1" align="center">
          {errorMsg}
        </Typography>
      )}
    </BackgroundBox>
  );
};
