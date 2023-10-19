import axios, { AxiosResponse } from 'axios';
import {
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
  AllExpensesResponse,
  UserInfo,
} from '../interfaces/interfaces';

/**
 * API signup request
 *
 * @param {SignupData} data - signup values from UI
 * @returns {AxiosResponse<SignupResponse>} - response
 * @throws {AxiosError}
 */
export const signupRequest = async (
  data: SignupData,
): Promise<AxiosResponse<SignupResponse>> => {
  const response: AxiosResponse = await axios.post<SignupResponse>(
    'http://localhost:7005/users/register',
    data,
  );
  return response;
};

/**
 * API login request
 *
 * @param {LoginData} data - login values from UI
 * @returns {AxiosResponse<LoginResponse>} - response
 * @throws {AxiosError}
 */
export const loginRequest = async (
  data: LoginData,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axios.post<LoginResponse>(
    'http://localhost:7005/users/login',
    data,
  );
  return response;
};

/**
 * API all user expenses
 *
 * @param {UserInfo} user - user info
 * @returns {AxiosResponse<AllExpensesResponse>} - response
 * @throws {AxiosError}
 */
export const allExpensesRequest = async (
  user: UserInfo,
): Promise<AxiosResponse<AllExpensesResponse>> => {
  const response: AxiosResponse = await axios.get(
    `http://localhost:7005/users/${user.userId}/expenses`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response;
};
