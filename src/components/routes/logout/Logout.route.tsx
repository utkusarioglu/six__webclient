import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import LogoutLayout from '_layouts/logout/Logout.layout';

const LogoutRoute = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>Logout - Reddit</title>
      </Helmet>
      <LogoutLayout />
    </>
  );
};

export default LogoutRoute;
