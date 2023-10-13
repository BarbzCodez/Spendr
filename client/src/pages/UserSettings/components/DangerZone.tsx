import { Stack, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import {
  DangerZoneStack,
  DeleteButton,
  ErrorBox,
  SecondaryText,
} from './styles';

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
    >
      <Typography variant="subtitle2">Delete Forever</Typography>
    </DeleteButton>
  );

  const deleteText = () => (
    <Stack>
      <Typography variant="subtitle1">Delete Account</Typography>
      <SecondaryText>
        Once deleted, there will be no way of retrieving this account
      </SecondaryText>
    </Stack>
  );

  return (
    <DangerZoneStack>
      <Typography variant="h6" component="h3" noWrap>
        {'Danger Zone'}
      </Typography>
      <ErrorBox
        sx={{
          border: '2px solid #EE5A5E',
        }}
      >
        {deleteText()}
        {deleteButton()}
      </ErrorBox>
    </DangerZoneStack>
  );
};
export default DangerZone;
