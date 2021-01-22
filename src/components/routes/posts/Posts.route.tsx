import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import PostsView from '_views/posts/Posts.view';

const PostsRoute = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);
  return (
    <>
      <Helmet>
        <title>Reddit - The front page of the internet</title>
      </Helmet>
      <PostsView />
    </>
  );
};

export default PostsRoute;
