import * as React from 'react';
import { Typography } from '@mui/material';

import { PrimaryDiv, PopupDiv } from '../../assets/styles';
import { SettingsStack } from './styles';
import Header from '../../components/Header';
import SettingsListComponent from './components/SettingsList';
import DangerZone from './components/DangerZone';

/**
 * User Settings page component
 *
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
