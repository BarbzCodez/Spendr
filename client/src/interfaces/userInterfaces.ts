import { ChangeEvent, FocusEvent } from 'react';

export interface UserInfo {
  userId: number;
  token: string;
}

export interface SignupData {
  username: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
  };
  token: string;
}

export interface UpdateUsernameData {
  username: string;
}

export interface UpdatePasswordData {
  password: string;
}

export interface SignupFields {
  username: string;
  password: string;
  confirmPassword: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface SignupTextFieldProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}
