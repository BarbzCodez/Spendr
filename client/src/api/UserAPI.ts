import axios, { AxiosResponse } from 'axios';

import {
  SignupVals,
  SignupResponse,
  LoginVals,
  LoginResponse,
  ResetPasswordVals,
  MessageResponse,
  UpdateUsernameVals,
  UpdatePasswordVals,
} from '../interfaces/interfaces';

/**
 * API signup request
 *
 * @param {dict} data - Username
 *                    - Password
 *                    - Security Question
 *                    - Security Answer
 * @returns {AxiosResponse}
 */
export const signupRequest = async (
  data: SignupVals,
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
 * @param {dict} data - Username
 *                    - Password
 * @returns {AxiosResponse}
 */
export const loginRequest = async (
  data: LoginVals,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axios.post<LoginResponse>(
    'http://localhost:7005/users/login',
    data,
  );
  return response;
};

/**
 * API Reset Password
 *
 * @param {dict} data - Username
 *                    - Password
 *                    - Security Question
 *                    - Security Answer
 * @returns {AxiosResponse}
 */
export const resetPassword = async (
  data: ResetPasswordVals,
): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.post<MessageResponse>(
    'http://localhost:7005/users/reset-password',
    data,
  );
  return response;
};

/**
 * API Update an user's username
 *
 * @param {dict} data - Username
 * @returns {AxiosResponse}
 */
export const updateUsername = async (
  data: UpdateUsernameVals,
): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.post<MessageResponse>(
    'http://localhost:7005/users/update-username',
    data,
  );
  return response;
};

/**
 * API Update an user's password
 *
 * @param {string} data - Password
 * @returns {AxiosResponse}
 */
export const updatePassword = async (
  data: UpdatePasswordVals,
): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.post<MessageResponse>(
    'http://localhost:7005/users/update-password',
    data,
  );
  return response;
};

/**
 * API Delete User
 *
 * @returns {AxiosResponse}
 */
export const deleteUser = async (): Promise<AxiosResponse<MessageResponse>> => {
  const response = await axios.delete<MessageResponse>(
    'http://localhost:7005/users/delete',
  );
  return response;
};
