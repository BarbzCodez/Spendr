import axios, { AxiosResponse } from 'axios';
import {
  SignupVals,
  SignupResponse,
  LoginVals,
  LoginResponse,
  AllExpensesResponse,
  UserInfo,
} from '../interfaces/interfaces';

/**
 * API signup request
 *
 * @param {string} username - Username
 * @param {string} password - Password
 * @param {string} securityQuestion - Security Question
 * @param {string} securityAnswer - Security Answer
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const signupRequest = async (
  data: SignupVals,
): Promise<AxiosResponse<SignupResponse>> => {
  try {
    const response: AxiosResponse = await axios.post<SignupResponse>(
      'http://localhost:7005/users/register',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * API login request
 *
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const loginRequest = async (
  data: LoginVals,
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await axios.post<LoginResponse>(
      'http://localhost:7005/users/login',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * API all user expenses
 *
 * @param {string} userId
 * @param {string} token
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const allExpensesRequest = async (
  user: UserInfo,
): Promise<AxiosResponse<AllExpensesResponse>> => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://localhost:7005/users/${user.userId}/expenses`,
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
