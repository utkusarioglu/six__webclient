import rest from '_services/rest/rest';

const CommunityFeedView = () => {
  rest.getCommunities();

  return <span>Community Feed</span>;
};

export default CommunityFeedView;
