import axios, { AxiosResponse, AxiosError } from 'axios';

import { ExpenseVals } from '../interfaces/interfaces';

/**
 * API Expense
 *
 * @param {string} title - Expense title
 * @param {number} amount - Expense amount
 * @param {string} category - Expense category
 * @param {string} createdAt - Expense creation time
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const expense = async (data: ExpenseVals): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(
      // TODO fetch userId and put it in path
      'http://localhost:7005/users/expenses',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
