import * as React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Groups3Icon from '@mui/icons-material/Groups3';
import WalletIcon from '@mui/icons-material/Wallet';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { blue, green, pink, yellow } from '@mui/material/colors';

import { HomePageInfo } from '../../interfaces/interfaces';

export const homeInfo: HomePageInfo[] = [
  {
    name: 'Expenses',
    description: 'See all the expenses you have entered',
    linkText: 'See all Expenses',
    link: '/expenses',
    icon: <AttachMoneyIcon fontSize="large" sx={{ color: green[500] }} />,
  },
  {
    name: 'Group Expenses',
    description: 'Create and view which group expenses you are part of',
    linkText: 'See all Group Expenses',
    link: '/group-expenses',
    icon: <Groups3Icon fontSize="large" sx={{ color: yellow[500] }} />,
  },
  {
    name: 'Budgets',
    description: 'Create and manage your Budgets',
    linkText: 'See all Budgets',
    link: '/budgets',
    icon: <WalletIcon fontSize="large" sx={{ color: pink[500] }} />,
  },
  {
    name: 'Analytics',
    description: 'Get more insight of your expenses',
    linkText: 'See your Analysis',
    link: '/analytics',
    icon: <AutoGraphIcon fontSize="large" sx={{ color: blue[500] }} />,
  },
];
