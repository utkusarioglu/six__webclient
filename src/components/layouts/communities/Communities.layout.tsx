import CommunityFeedView from '_views/community-feed/CommunityFeed.view';
import CreateCommunityControlsView from '../../views/create-community-controls/CreateCommunityControls.view';

const CommunitiesLayout = () => {
  return (
    <>
      <CreateCommunityControlsView />
      <CommunityFeedView />
    </>
  );
};

export default CommunitiesLayout;
