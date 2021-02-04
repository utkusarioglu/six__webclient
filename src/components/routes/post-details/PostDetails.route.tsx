import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import PostDetailsLayout from '_layouts/post-details/PostDetails.layout';

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
      <PostDetailsLayout {...{ postSlug, communitySlug }} />
    </>
  );
};

export default PostDetailsRoute;
