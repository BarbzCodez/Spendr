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

import { PrimaryDiv } from '../../assets/styles/styles';
import Header from '../../components/Header';
import { HomePageStack } from './styles';
import { useUser } from '../../context/UserContext';
import { homeInfo } from './constants';

/**
 * Home page component
 * @returns {JSX.Element} - Home page greeting the user and a explanation of what we offer
 */
const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { username } = useUser();

  return (
    <PrimaryDiv>
      <Header />
      <Stack justifyContent="center" alignItems="center" padding="3%">
        <Typography variant="h3" justifyContent="center" alignItems="center">
          Welcome back, {username}!
        </Typography>
      </Stack>
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
    </PrimaryDiv>
  );
};

export default Home;
