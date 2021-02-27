import { useSelector } from 'react-redux';
import { getCommunities } from '_slices/communities/communities.slice';
import { emptyCommunity } from '_slices/communities/communities.slice.constants';
import rest from '_services/rest/rest';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommunityCardView from '../community-card/CommunityCard.view';

const CommunityFeedView = () => {
  const { updatedAt, list: communities } = useSelector(getCommunities);
  const retrieveCommunities = () => delayIfDev(() => rest.getCommunities());

  if (!updatedAt) {
    retrieveCommunities();
    return skeletons();
  } else if (Date.now() - updatedAt > 10000) {
    retrieveCommunities();
  }

  if (!!updatedAt && !communities.length) {
    return <span>There are no communities to show</span>;
  }

  return (
    <>
      {communities &&
        communities.map((community) => (
          <CommunityCardView
            {...{ key: community.id, asSkeleton: false, ...community }}
          />
        ))}
    </>
  );
};

function skeletons() {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, key) => (
          <CommunityCardView
            {...{
              key,
              asSkeleton: true,
              ...emptyCommunity,
            }}
          />
        ))}
    </>
  );
}

export default CommunityFeedView;
