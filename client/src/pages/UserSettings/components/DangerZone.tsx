import { Stack, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import {
  SettingStack,
  DangerZoneStackElements,
  DeleteButton,
  ErrorBox,
  SecondaryTextDangerZone,
} from './styles';
import { theme } from '../../../assets/styles';

/**
 * Return the the box component with the danger zone attributes
 * @returns {JSX.Element} - Danger Zone component
 */
const DangerZone = (): JSX.Element => {
  const deleteButton = () => (
    <DeleteButton
      variant="outlined"
      startIcon={<DeleteForeverIcon />}
      aria-label="delete-account-button"
      sx={{ whiteSpace: 'nowrap' }}
    >
      Delete Forever
    </DeleteButton>
  );

  const deleteText = () => (
    <Stack>
      <Typography variant="subtitle1">Delete Account</Typography>
      <SecondaryTextDangerZone variant="subtitle2">
        Once deleted, there will be no way of retrieving this account
      </SecondaryTextDangerZone>
    </Stack>
  );

  return (
    <SettingStack>
      <Typography variant="h5" component="h3" p="1rem" noWrap>
        {'Danger Zone'}
      </Typography>
      <ErrorBox
        sx={{
          border: '2px solid',
          borderColor: theme.palette.error.main,
        }}
      >
        <DangerZoneStackElements spacing={2}>
          {deleteText()}
          {deleteButton()}
        </DangerZoneStackElements>
      </ErrorBox>
    </SettingStack>
  );
};
export default DangerZone;
