export interface LoggedInProps {
  isLoggedIn: boolean;
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
  };
  token: string;
}
