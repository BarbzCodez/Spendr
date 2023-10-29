import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { MenuItem, TextField, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { BackgroundBox, CenteredBox, ComparisonGraphBox } from './styles';

const dailyTotals1 = [
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

const dailyTotals2 = [
  { date: '2023-09-01', amount: 64.23 },
  { date: '2023-09-02', amount: 32.65 },
  { date: '2023-09-03', amount: 89.54 },
  { date: '2023-09-04', amount: 23.12 },
  { date: '2023-09-05', amount: 87.57 },
  { date: '2023-09-06', amount: 23.65 },
  { date: '2023-09-07', amount: 84.34 },
  { date: '2023-09-08', amount: 76.23 },
  { date: '2023-09-09', amount: 15.23 },
  { date: '2023-09-10', amount: 97.24 },
  { date: '2023-09-11', amount: 38.75 },
  { date: '2023-09-12', amount: 83.34 },
  { date: '2023-09-13', amount: 26.88 },
  { date: '2023-09-14', amount: 93.35 },
  { date: '2023-09-15', amount: 88.35 },
  { date: '2023-09-16', amount: 23.66 },
  { date: '2023-09-17', amount: 13.25 },
  { date: '2023-09-18', amount: 64.35 },
  { date: '2023-09-19', amount: 55.45 },
  { date: '2023-09-20', amount: 87.24 },
  { date: '2023-09-21', amount: 12.35 },
  { date: '2023-09-22', amount: 85.34 },
  { date: '2023-09-23', amount: 35.24 },
  { date: '2023-09-24', amount: 86.75 },
  { date: '2023-09-25', amount: 24.76 },
  { date: '2023-09-26', amount: 57.76 },
  { date: '2023-09-27', amount: 68.46 },
  { date: '2023-09-28', amount: 69.99 },
  { date: '2023-09-29', amount: 94.46 },
  { date: '2023-09-30', amount: 35.57 },
];

function getMonthsArray() {
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
}

/**
 * Comparison graph component
 *
 * @returns {JSX.Element} - comparison graph
 */
export const CompareGraph: React.FC = () => {
  const monthsArray = getMonthsArray();
  const [month1Index, setMonth1Index] = useState(0);
  const [month2Index, setMonth2Index] = useState(1);
  const [data1, setData1] = useState(dailyTotals1);
  const [data2, setData2] = useState(dailyTotals2);

  const maxLength = Math.max(data1.length, data2.length);
  const combinedData = Array.from({ length: maxLength }, (_, index) => {
    const entry1 = data1[index] || { amount: 0 };
    const entry2 = data2[index] || { amount: 0 };
    const day = index + 1;

    return {
      day,
      amount1: entry1.amount,
      amount2: entry2.amount,
    };
  });

  const getAverage = (data: { date: string; amount: number }[]) => {
    const totalAmount = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
    const average = totalAmount / data.length;
    return average.toFixed(2);
  };

  const getComparisonInfo = () => {
    const month1String = new Date(
      monthsArray[month1Index].year,
      monthsArray[month1Index].month,
    ).toLocaleString('default', {
      month: 'short',
    });
    const month2String = new Date(
      monthsArray[month2Index].year,
      monthsArray[month2Index].month,
    ).toLocaleString('default', {
      month: 'short',
    });

    const month1Avg = getAverage(data1);
    const month2Avg = getAverage(data2);
    const percentageChange = (
      ((Number(month2Avg) - Number(month1Avg)) / Number(month1Avg)) *
      100
    ).toFixed(2);
    const isDecrease = month1Avg > month2Avg;

    return (
      <CenteredBox
        style={{
          flexDirection: 'column',
        }}
      >
        <Typography variant="body1" style={{ width: 157 }}>
          {month1String} average: {month1Avg}
        </Typography>
        <Typography variant="body1" style={{ width: 157 }}>
          {month2String} average: {month2Avg}
        </Typography>

        {isDecrease ? (
          <CenteredBox
            style={{
              flexDirection: 'row',
            }}
          >
            <ArrowDownward sx={{ color: 'green' }} />
            <Typography variant="body1">{percentageChange}%</Typography>
          </CenteredBox>
        ) : (
          <CenteredBox
            style={{
              flexDirection: 'row',
            }}
          >
            <ArrowUpward sx={{ color: 'red' }} />
            <Typography variant="body1">{percentageChange}%</Typography>
          </CenteredBox>
        )}
      </CenteredBox>
    );
  };

  const changeMonth1 = (newVal: number) => {
    setMonth1Index(newVal);

    // TODO set data1 to be the response from fetchDailyExpenses
    setData1(dailyTotals1);
    // fetchDailyExpenses(newVal);
  };

  const changeMonth2 = (newVal: number) => {
    setMonth2Index(newVal);

    // TODO set data2 to be the response from fetchDailyExpenses
    setData2(dailyTotals2);
    // fetchDailyExpenses(newVal);
  };

  // const fetchDailyExpenses = async (index: number) => {
  //   // const obj = monthsArray[index];
  //   // const dateStart = new Date(obj.year, obj.month, 1, 0, 0, 0);
  //   // const dateEnd =
  //   //   obj.month == 11
  //   //     ? new Date(obj.year, obj.month, 31, 23, 59, 59)
  //   //     : new Date(obj.year, obj.month + 1, 0, 23, 59, 59);

  //   // TODO send a request and return the corresponding response
  //   return;
  // };

  return (
    <BackgroundBox style={{ width: '100%' }}>
      <CenteredBox>
        <TextField
          select
          id="month1"
          label="Month 1"
          size="small"
          value={month1Index}
          onChange={(e) => changeMonth1(e.target.value as unknown as number)}
          style={{ margin: '0 2vw', marginTop: '1vh' }}
          InputLabelProps={{
            style: { color: '#C353DB' },
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
          value={month2Index}
          onChange={(e) => changeMonth2(e.target.value as unknown as number)}
          style={{ margin: '0 2vw', marginTop: '1vh' }}
          InputLabelProps={{
            style: { color: '#F1E194' },
          }}
        >
          {monthsArray.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.text}
            </MenuItem>
          ))}
        </TextField>
      </CenteredBox>
      <ComparisonGraphBox>
        <LineChart
          xAxis={[
            {
              dataKey: 'day',
              min: 1,
              max: maxLength,
            },
          ]}
          series={[
            {
              dataKey: 'amount1',
              label: 'Month 1 Daily Total Expense',
              color: '#C353DB',
              showMark: true,
            },
            {
              dataKey: 'amount2',
              label: 'Month 2 Daily Total Expense',
              color: '#F1E194',
              showMark: true,
            },
          ]}
          dataset={combinedData}
        />
        {getComparisonInfo()}
      </ComparisonGraphBox>
    </BackgroundBox>
  );
};
