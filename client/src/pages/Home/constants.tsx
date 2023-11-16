import * as React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Groups3Icon from '@mui/icons-material/Groups3';
import WalletIcon from '@mui/icons-material/Wallet';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { blue, green, pink, yellow } from '@mui/material/colors';

import { HomePageInfo } from '../../interfaces/generalInterfaces';

/**
 * Information for the home page, containing details about different sections.
 *
 * @property {string} name - The name of the section.
 * @property {string} description - Description of the section.
 * @property {string} linkText - The text displayed for the link to the section.
 * @property {string} link - The URL path for the section.
 * @property {JSX.Element} icon - The icon associated with the section.
 */
export const homeInfo: HomePageInfo[] = [
  {
    name: 'Expenses',
    description:
      'Manage your personal expenses by viewing, adding, editing, and deleting transactions, helping you stay on top of your financial records.',
    linkText: 'See your Expenses',
    link: '/expenses',
    icon: <AttachMoneyIcon fontSize="large" sx={{ color: green[500] }} />,
  },
  {
    name: 'Group Expenses',
    description:
      'Keep track of group expenses, add new group expenses, mark payments, and check payment status of others, making it easy to manage shared expenses with friends or colleagues.',
    linkText: 'See your Group Expenses',
    link: '/group-expenses',
    icon: <Groups3Icon fontSize="large" sx={{ color: yellow[500] }} />,
  },
  {
    name: 'Budgets',
    description:
      'Create and manage budgets with customizable frequency and categories, allowing you to track and control your spending effectively.',
    linkText: 'See your Budgets',
    link: '/budgets',
    icon: <WalletIcon fontSize="large" sx={{ color: pink[500] }} />,
  },
  {
    name: 'Analytics',
    description:
      'Gain valuable insights into your monthly spending habits and visually compare months to make informed financial decisions.',
    linkText: 'See your Expenses Analysis',
    link: '/analytics',
    icon: <AutoGraphIcon fontSize="large" sx={{ color: blue[500] }} />,
  },
];
