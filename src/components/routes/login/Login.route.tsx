import LoginLayout from '_layouts/login/Login.layout';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const LoginRoute = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>Login - Reddit</title>
      </Helmet>
      <LoginLayout />
    </>
  );
};

export default LoginRoute;
