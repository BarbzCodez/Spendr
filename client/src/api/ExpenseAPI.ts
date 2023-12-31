import axios, { AxiosResponse } from 'axios';

import { MessageResponse } from '../interfaces/generalInterfaces';
import { UserInfo } from '../interfaces/userInterfaces';
import {
  ExpenseUIData,
  AddExpenseResponse,
  ExpenseData,
  EditExpenseResponse,
} from '../interfaces/expenseInterfaces';

/**
 * API add expense
 *
 * @param {ExpenseUIData} data - expense values from UI
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<AddExpenseResponse>}
 * @throws {AxiosError}
 */
export const addExpenseRequest = async (
  data: ExpenseUIData,
  user: UserInfo,
): Promise<AxiosResponse<AddExpenseResponse>> => {
  const response = await axios.post<AddExpenseResponse>(
    `${process.env.REACT_APP_API_URL}/api/expenses`,
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};

/**
 * API edit expense
 *
 * @param {ExpenseData} data - all expense values
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<EditExpenseResponse>}
 * @throws {AxiosError}
 */
export const editExpenseRequest = async (
  data: ExpenseData,
  user: UserInfo,
): Promise<AxiosResponse<EditExpenseResponse>> => {
  const response = await axios.put<EditExpenseResponse>(
    `${process.env.REACT_APP_API_URL}/api/expenses/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};

/**
 * API delete expense
 *
 * @param {ExpenseData} data - expense values from UI
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<MessageResponse>}
 * @throws {AxiosError}
 */
export const deleteExpenseRequest = async (
  data: ExpenseData,
  user: UserInfo,
): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.delete<MessageResponse>(
    `${process.env.REACT_APP_API_URL}/api/expenses/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};
