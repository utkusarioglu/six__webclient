import type { FC } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import PostCreateLayout from '_layouts/post-create/PostCreate.layout';

const PostCreateRoute: FC<{}> = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>Create new post - Reddit</title>
      </Helmet>
      <PostCreateLayout />
    </>
  );
};

export default PostCreateRoute;
