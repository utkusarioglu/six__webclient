import type { FC } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import CommunityCreateLayout from '_layouts/community-create/CommunityCreate.layout';

const PostCreateRoute: FC<{}> = () => {
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>Create new community - Reddit</title>
      </Helmet>
      <CommunityCreateLayout />
    </>
  );
};

export default PostCreateRoute;
