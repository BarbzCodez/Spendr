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
 * API Reset Password
 *
 * @param {string} username - Username
 * @param {string} password - Password
 * @param {string} securityQuestion - Security Question
 * @param {string} securityAnswer - Security Answer
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const resetPassword = async (
  data: ResetPasswordVals,
): Promise<AxiosResponse<MessageResponse>> => {
  try {
    const response = await axios.post<MessageResponse>(
      'http://localhost:7005/users/reset-password',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * API Update an user's username
 *
 * @param {string} username - Username
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const updateUsername = async (
  data: UpdateUsernameVals,
): Promise<AxiosResponse<MessageResponse>> => {
  try {
    const response = await axios.post<MessageResponse>(
      'http://localhost:7005/users/update-username',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * API Update an user's password
 *
 * @param {string} password - Password
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const updatePassword = async (
  data: UpdatePasswordVals,
): Promise<AxiosResponse<MessageResponse>> => {
  try {
    const response = await axios.post<MessageResponse>(
      'http://localhost:7005/users/update-password',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * API Delete User
 *
 * @returns {AxiosResponse}
 * @throws {AxiosError}
 */
export const deleteUser = async (): Promise<AxiosResponse<MessageResponse>> => {
  try {
    const response = await axios.post<MessageResponse>(
      'http://localhost:7005/delete',
    );
    return response;
  } catch (error) {
    throw error;
  }
};
