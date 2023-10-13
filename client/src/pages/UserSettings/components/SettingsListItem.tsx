import { Divider, IconButton, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { SettingsList, SecondaryText } from './styles';

/**
 * Return the list of settings component
 * @returns {JSX.Element} - List of settings component
 */
const SettingsListComponent = (): JSX.Element => {
  const SettingsListItem = (label: string, info: string) => (
    <ListItem
      key={label}
      disablePadding
      secondaryAction={
        <IconButton aria-label="edit" color="inherit">
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={label}
        primaryTypographyProps={{ variant: 'subtitle1' }}
        secondary={
          <SecondaryText variant={'subtitle2'}>
            {info} for the {label}
          </SecondaryText>
        }
      />
    </ListItem>
  );

  return (
    <SettingsList>
      {SettingsListItem('Username', 'api call')}
      <Divider color={'white'} />
      {SettingsListItem('Name', 'api call')}
      <Divider color={'white'} />
      {SettingsListItem('Password', 'api call')}
      <Divider color={'white'} />
      {SettingsListItem('Security Question', 'api call')}
      {SettingsListItem('Security Answer', 'api call')}
    </SettingsList>
  );
};

export default SettingsListComponent;
