import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { MenuItem, TextField, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { BackgroundBox, CenteredBox, ComparisonGraphBox } from './styles';
import { dailyTotalExpensesRequest } from '../../../api/UserAPI';
import { useUser } from '../../../context/UserContext';
import { DailyTotal } from '../../../interfaces/interfaces';

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
    { date: Date; amount: number }[]
  >([]);
  const [secondMonthData, setSecondMonthData] = useState<
    { date: Date; amount: number }[]
  >([]);
  const [combinedData, setCombinedData] = useState<
    (
      | { day: number; firstAmount: number; secondAmount: number }
      | { day: number; firstAmount: number }
      | { day: number; secondAmount: number }
    )[]
  >([]);
  const [errorMsg, setErrorMsg] = React.useState('No data to show');
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
    setCorrespondingData(firstMonthIndex, setFirstMonthData);
    setCorrespondingData(secondMonthIndex, setSecondMonthData);
    calcCombinedData();
  }, []);

  React.useEffect(() => {
    setCorrespondingData(firstMonthIndex, setFirstMonthData);
    calcCombinedData();
  }, [firstMonthIndex]);

  React.useEffect(() => {
    setCorrespondingData(secondMonthIndex, setSecondMonthData);
    calcCombinedData();
  }, [secondMonthIndex]);

  const setCorrespondingData = (
    index: number,
    setFunc: React.Dispatch<
      React.SetStateAction<
        {
          date: Date;
          amount: number;
        }[]
      >
    >,
  ) => {
    const monthYear = monthsArray[index];
    const startDate = new Date(monthYear.year, monthYear.month, 1);
    const endDate = new Date(monthYear.year, monthYear.month + 1, 0);
    console.log('startDate: ' + startDate + ', eEndDate: ' + endDate);

    fetchDailyExpenses(startDate.toISOString(), endDate.toISOString(), setFunc);
  };

  const fetchDailyExpenses = async (
    startDate: string,
    endDate: string,
    setData: React.Dispatch<
      React.SetStateAction<
        {
          date: Date;
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
          const totalsWithDates: { date: Date; amount: number }[] = totals.map(
            (item) => ({
              ...item,
              date: new Date(`${item.date}T12:00:00Z`),
            }),
          );

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

    return;
  };

  const calcCombinedData = () => {
    firstMonthData.sort((x, y) => x.date.getTime() - y.date.getTime());
    secondMonthData.sort((x, y) => x.date.getTime() - y.date.getTime());
    const combinedArray: (
      | { day: number; firstAmount: number; secondAmount: number }
      | { day: number; firstAmount: number }
      | { day: number; secondAmount: number }
    )[] = [];

    let firstIndex = 0;
    let secondIndex = 0;

    while (
      firstIndex < firstMonthData.length ||
      secondIndex < secondMonthData.length
    ) {
      const firstObj =
        firstIndex < firstMonthData.length
          ? firstMonthData[firstIndex]
          : undefined;
      const secondObj =
        secondIndex < secondMonthData.length
          ? secondMonthData[secondIndex]
          : undefined;

      if (firstObj == undefined && secondObj != undefined) {
        combinedArray.push({
          day: secondObj.date.getDate(),
          secondAmount: secondObj.amount,
        });
        secondIndex++;
      } else if (secondObj == undefined && firstObj != undefined) {
        combinedArray.push({
          day: firstObj.date.getDate(),
          firstAmount: firstObj.amount,
        });
        firstIndex++;
      } else if (firstObj != undefined && secondObj != undefined) {
        if (firstObj.date.getTime() == secondObj.date.getTime()) {
          combinedArray.push({
            day: firstObj.date.getDate(),
            firstAmount: firstObj.amount,
            secondAmount: secondObj.amount,
          });
          firstIndex++;
          secondIndex++;
        } else if (firstObj.date.getTime() < secondObj.date.getTime()) {
          combinedArray.push({
            day: firstObj.date.getDate(),
            firstAmount: firstObj.amount,
          });
          firstIndex++;
        } else {
          // firstObj.date.getTime() > secondObj.date.getTime()
          combinedArray.push({
            day: secondObj.date.getDate(),
            secondAmount: secondObj.amount,
          });
          secondIndex++;
        }
      }
    }

    setCombinedData(combinedArray);
  };

  const getAverage = (data: { date: Date; amount: number }[]) => {
    const totalAmount = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0,
    );
    const average = totalAmount / data.length;
    return average.toFixed(2);
  };

  const getComparisonInfo = () => {
    const month1String = new Date(
      monthsArray[firstMonthIndex].year,
      monthsArray[firstMonthIndex].month,
    ).toLocaleString('default', {
      month: 'short',
    });
    const month2String = new Date(
      monthsArray[secondMonthIndex].year,
      monthsArray[secondMonthIndex].month,
    ).toLocaleString('default', {
      month: 'short',
    });

    const firstMonthAvg = getAverage(firstMonthData);
    const secondMonthAvg = getAverage(secondMonthData);
    const percentageChange = (
      ((Number(secondMonthAvg) - Number(firstMonthAvg)) /
        Number(firstMonthAvg)) *
      100
    ).toFixed(2);
    const isDecrease = firstMonthAvg > secondMonthAvg;

    return (
      <CenteredBox
        style={{
          flexDirection: 'column',
        }}
      >
        <Typography variant="body1" style={{ width: 157 }}>
          {month1String} average: {firstMonthAvg}
        </Typography>
        <Typography variant="body1" style={{ width: 157 }}>
          {month2String} average: {secondMonthAvg}
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
          value={secondMonthIndex}
          onChange={(e) =>
            changeSecondMonthIndex(e.target.value as unknown as number)
          }
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
      {firstMonthData.length != 0 && secondMonthData.length != 0 && (
        <ComparisonGraphBox>
          <LineChart
            xAxis={[
              {
                dataKey: 'day',
                min: 1,
                max: 31,
              },
            ]}
            series={[
              {
                dataKey: 'firstAmount',
                label: 'Month 1 Daily Total Expense',
                color: '#C353DB',
                showMark: true,
              },
              {
                dataKey: 'secondAmount',
                label: 'Month 2 Daily Total Expense',
                color: '#F1E194',
                showMark: true,
              },
            ]}
            dataset={combinedData}
          />
          {getComparisonInfo()}
        </ComparisonGraphBox>
      )}
      {(firstMonthData.length == 0 || secondMonthData.length == 0) && (
        <Typography variant="body1" align="center">
          {errorMsg}
        </Typography>
      )}
    </BackgroundBox>
  );
};
