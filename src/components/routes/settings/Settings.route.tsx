import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const SettingsRoute = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>Settings - Reddit</title>
      </Helmet>
      <span>This is where user settings will be displayed</span>
    </>
  );
};

export default SettingsRoute;
