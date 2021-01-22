import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import PostDetailsView from '_views/post-details/PostDetails.view';

interface CommunityRouteParams {
  communitySlug: string;
  postSlug: string;
}

const PostDetailsRoute = () => {
  const { communitySlug, postSlug } = useParams<CommunityRouteParams>();
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>
          {postSlug} - {communitySlug} - Reddit
        </title>
      </Helmet>
      <PostDetailsView />
    </>
  );
};

export default PostDetailsRoute;
