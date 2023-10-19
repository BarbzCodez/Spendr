export interface LoggedInProps {
  isLoggedIn: boolean;
}

export interface UserInfo {
  userId: number;
  token: string;
}

export interface SignupVals {
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

export interface LoginVals {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    password: string;
    securityQuestion: string;
    securityAnswer: string;
  };
  token: string;
}

export interface UpdateUsernameVals {
  username: string;
}

export interface UpdatePasswordVals {
  password: string;
}

export interface ResetPasswordVals {
  username: string;
  securityAnswer: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}
