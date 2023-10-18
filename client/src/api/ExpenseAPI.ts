import axios, { AxiosResponse } from 'axios';

import {
  ExpenseUIVals,
  UserInfo,
  AddExpenseResponse,
} from '../interfaces/interfaces';

/**
 * API add expense
 *
 * @param {ExpenseUIVals} data - expense values from UI
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<AddExpenseResponse>}
 * @throws {AxiosError}
 */
export const addExpenseRequest = async (
  data: ExpenseUIVals,
  user: UserInfo,
): Promise<AxiosResponse<AddExpenseResponse>> => {
  const expenseWithTime = { ...data, createdAt: new Date().toISOString() };

  const response = await axios.post<AddExpenseResponse>(
    'http://localhost:7005/expenses',
    expenseWithTime,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};
