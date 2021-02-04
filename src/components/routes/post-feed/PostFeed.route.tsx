import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import PostFeedLayout from '_layouts/post-feed/PostFeed.layout';

const PostFeeRoute = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);
  return (
    <>
      <Helmet>
        <title>Reddit - The front page of the internet</title>
      </Helmet>
      <PostFeedLayout />
    </>
  );
};

export default PostFeeRoute;
