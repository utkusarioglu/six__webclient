import { useEffect } from 'react';
import rest from '_services/rest/rest';
import { getUser } from '_slices/user/user.slice';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const LogoutView = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  useEffect(() => {
    rest.logout();
  }, []);

  if (user.state === 'visitor') {
    setTimeout(() => history.push('/'), 1000);
  }

  return <Typography>Logging out...</Typography>;
};

export default LogoutView;
