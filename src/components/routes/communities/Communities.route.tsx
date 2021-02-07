import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import CommunitiesLayout from '_layouts/communities/Communities.layout';

const CommunitiesRoute = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>Communities - Reddit</title>
      </Helmet>
      <CommunitiesLayout />
    </>
  );
};

export default CommunitiesRoute;
