import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

interface CommunityRouteParams {
  communitySlug: string;
}

const CommunityRoute = () => {
  const { communitySlug } = useParams<CommunityRouteParams>();
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>{communitySlug} - Reddit</title>
      </Helmet>
      <span>You are in community: {communitySlug}</span>
    </>
  );
};

export default CommunityRoute;
