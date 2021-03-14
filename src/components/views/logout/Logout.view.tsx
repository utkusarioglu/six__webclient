import { useEffect } from 'react';
import rest from '_services/rest/rest';
import { selectUser } from '_slices/user/user.slice';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import snacks from '_services/snacks/snacks';
import { REDIRECT_TIMEOUT } from '_config';

const LogoutView = () => {
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    rest.logout();
  }, []);

  if (user.state === 'visitor') {
    snacks.push('loggedOut');
    snacks.push('loginPrompt');
    setTimeout(() => history.push('/'), REDIRECT_TIMEOUT);
  }

  return <Typography>Logging out...</Typography>;
};

export default LogoutView;
