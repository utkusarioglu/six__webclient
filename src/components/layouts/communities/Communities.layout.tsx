import CommunityFeedView from '_views/community-feed/CommunityFeed.view';
import Button from '@material-ui/core/Button';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

const CommunitiesLayout = () => {
  return (
    <>
      <Button component={domLinkHelper('/community/create')}>
        Create a community
      </Button>
      <CommunityFeedView />
    </>
  );
};

export default CommunitiesLayout;
