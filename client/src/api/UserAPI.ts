import axios, { AxiosResponse, AxiosError } from 'axios';

import { SignupVals } from '../interfaces/interfaces';

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
export const signup = async (data: SignupVals): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(
      'http://localhost:7005/users/register',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
