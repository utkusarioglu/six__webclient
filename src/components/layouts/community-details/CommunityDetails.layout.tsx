import type { FC } from 'react';
import CommunityDetailsView from '_views/community-details/CommunityDetails.view';
import PostFeedView from '_views/post-feed/PostFeed.view';

interface CommunityDetailsLayoutProps {
  communitySlug: string;
}

const CommunityDetailsLayout: FC<CommunityDetailsLayoutProps> = ({
  communitySlug,
}) => {
  return (
    <>
      <CommunityDetailsView {...{ communitySlug }} />
      <PostFeedView />
    </>
  );
};

export default CommunityDetailsLayout;
