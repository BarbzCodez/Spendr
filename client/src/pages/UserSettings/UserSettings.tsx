import * as React from 'react';
import { Typography } from '@mui/material';

import { PrimaryDiv, CardBox } from '../../assets/styles';
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
      <Typography
        variant="h4"
        align="center"
        noWrap
        paddingTop="5vh"
        paddingBottom="2vh"
      >
        {'User Settings'}
      </Typography>
      <CardBox>
        <SettingsStack spacing={2} boxShadow={3}>
          <SettingsListComponent />
          <DangerZone />
        </SettingsStack>
      </CardBox>
    </PrimaryDiv>
  );
};

export default UserSettings;
