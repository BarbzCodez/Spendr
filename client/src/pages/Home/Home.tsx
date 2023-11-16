import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PrimaryDiv } from '../../assets/styles';
import Header from '../../components/Header';
import { HomePageStack } from './styles';
import { useUser } from '../../context/UserContext';
import { homeInfo } from './constants';

/**
 * Home page component
 *
 * @returns {JSX.Element} - Home page greeting the user and a explaining each component of Spendr
 */
const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { username } = useUser();

  return (
    <PrimaryDiv>
      <Header />
      <Stack
        direction="column"
        spacing={2}
        style={{
          paddingTop: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" padding="20px">
          Welcome back, {username}!
        </Typography>
        <HomePageStack direction="row" spacing={2} useFlexGap>
          {homeInfo.map((info) => (
            <Card
              key={info.name}
              sx={{
                height: 220,
                display: 'flex',
                flexDirection: 'column',
                width: 420,
              }}
            >
              <CardContent>
                {info.icon}
                <Typography gutterBottom variant="h5" component="div">
                  {info.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {info.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ mt: 'auto' }}>
                <Button
                  size="small"
                  color="success"
                  onClick={() => navigate(info.link)}
                >
                  {info.linkText}
                </Button>
              </CardActions>
            </Card>
          ))}
        </HomePageStack>
      </Stack>
    </PrimaryDiv>
  );
};

export default Home;
