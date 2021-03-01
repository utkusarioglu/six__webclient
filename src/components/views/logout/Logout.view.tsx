import { useEffect } from 'react';
import rest from '_services/rest/rest';
import { selectUser } from '_slices/user/user.slice';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import snacks from '_services/snacks/snacks';

const LogoutView = () => {
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    rest.logout();
  }, []);

  if (user.state === 'visitor') {
    snacks.push('loggedOut');
    snacks.push('loginPrompt');
    setTimeout(() => history.push('/'), 1000);
  }

  return <Typography>Logging out...</Typography>;
};

export default LogoutView;
