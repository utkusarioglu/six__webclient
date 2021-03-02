import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import CommunityDetailsLayout from '_layouts/community-details/CommunityDetails.layout';

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
      <CommunityDetailsLayout {...{ communitySlug }} />
    </>
  );
};

export default CommunityRoute;
