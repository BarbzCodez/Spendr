import * as React from 'react';
import { PrimaryDiv } from '../../assets/styles/';
import Header from '../../components/Header';
import { Typography } from '@mui/material';

import { SettingsStack } from './styles';
import { PopupDiv } from '../../styles';
import SettingsListComponent from './components/SettingsListItem';
import DangerZone from './components/DangerZone';

/**
 * User Settings page component
 * @returns {JSX.Element} - User Settings page
 */
const UserSettings = (): JSX.Element => {
  return (
    <PrimaryDiv>
      <Header />
      <PopupDiv>
        <SettingsStack spacing={2} boxShadow={5}>
          <Typography variant="h4" component="h2" noWrap>
            {'User Settings'}
          </Typography>
          <SettingsListComponent />
          <DangerZone />
        </SettingsStack>
      </PopupDiv>
    </PrimaryDiv>
  );
};

export default UserSettings;
