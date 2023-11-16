import axios, { AxiosResponse } from 'axios';

import { MessageResponse } from '../interfaces/generalInterfaces';
import { UserInfo } from '../interfaces/userInterfaces';
import {
  BudgetUIData,
  AddBudgetResponse,
  BudgetData,
  EditBudgetResponse,
} from '../interfaces/budgetInterfaces';

/**
 * API add Budget
 *
 * @param {BudgetUIData} data - budget values from UI
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<AddBudgetResponse>}
 * @throws {AxiosError}
 */
export const addBudgetRequest = async (
  data: BudgetUIData,
  user: UserInfo,
): Promise<AxiosResponse<AddBudgetResponse>> => {
  const response = await axios.post<AddBudgetResponse>(
    'http://localhost:7005/budgets',
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
 * API edit budget
 *
 * @param {BudgetData} data - all budget values
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<EditBudgetResponse>}
 * @throws {AxiosError}
 */
export const editBudgetRequest = async (
  data: BudgetData,
  user: UserInfo,
): Promise<AxiosResponse<EditBudgetResponse>> => {
  const response = await axios.put<EditBudgetResponse>(
    `http://localhost:7005/budgets/${data.id}`,
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
 * API delete budget
 *
 * @param {BudgetData} data - budget values from UI
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<MessageResponse>}
 * @throws {AxiosError}
 */
export const deleteBudgetRequest = async (
  data: BudgetData,
  user: UserInfo,
): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.delete<MessageResponse>(
    `http://localhost:7005/budgets/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};
