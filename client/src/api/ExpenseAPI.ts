import axios, { AxiosResponse } from 'axios';

import {
  ExpenseUIVals,
  UserInfo,
  AddExpenseResponse,
} from '../interfaces/interfaces';

/**
 * API add expense
 *
 * @param {string} title - Expense title
 * @param {number} amount - Expense amount
 * @param {string} category - Expense category
 * @param {number} userId - user id
 * @param {string} token - user token
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const addExpenseRequest = async (
  data: ExpenseUIVals,
  user: UserInfo,
): Promise<AxiosResponse<AddExpenseResponse>> => {
  try {
    console.log(data.amount);
    const expenseWithTime = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    console.log(expenseWithTime);

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
  } catch (error) {
    throw error;
  }
};
