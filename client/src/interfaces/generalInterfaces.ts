export type Duration = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type Categories =
  | 'GROCERIES'
  | 'TRANSPORT'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'UTILITIES'
  | 'OTHER';

export interface MessageResponse {
  message: string;
}

export interface HomePageInfo {
  name: string;
  description: string;
  linkText: string;
  link: string;
  icon: JSX.Element;
}

export interface ReceiptData {
  title: string;
  amount: number;
  date: string;
}

export interface StartEndDatesData {
  startDate: string;
  endDate: string;
}

export interface DailyTotal {
  date: string;
  amount: number;
}

export interface DailyTotalsResponse {
  success: boolean;
  data: [DailyTotal];
}

export interface CategoryTotalsResponse {
  success: boolean;
  data: { category: string; amount: number }[];
}
