import axios, { AxiosResponse } from 'axios';

import { MessageResponse } from '../interfaces/generalInterfaces';
import { UserInfo } from '../interfaces/userInterfaces';
import {
  GroupExpenseUIData,
  AddGroupExpenseResponse,
  GroupExpenseAsPaid,
} from '../interfaces/groupSplitInterfaces';

/**
 * API add group expense
 *
 * @param {GroupExpenseUIData} data - expense values from UI
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<AddGroupExpenseResponse>}
 * @throws {AxiosError}
 */
export const addGroupExpenseRequest = async (
  data: GroupExpenseUIData,
  user: UserInfo,
): Promise<AxiosResponse<AddGroupExpenseResponse>> => {
  const response = await axios.post<AddGroupExpenseResponse>(
    'http://localhost:7005/group-expenses',
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
 * API mark group expense as paid
 *
 * @param {GroupExpenseAsPaid} data - This has the group expense ID
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<MessageResponse>}
 * @throws {AxiosError}
 */
export const markGroupExpenseAsPaidRequest = async (
  data: GroupExpenseAsPaid,
  user: UserInfo,
): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.put<MessageResponse>(
    `http://localhost:7005/group-expenses/${data.groupExpenseId}/mark-as-paid`,
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};
