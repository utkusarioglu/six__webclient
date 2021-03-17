import { useSelector } from 'react-redux';
import { selectCommunities } from '_slices/community-repo/community-repo.slice';
import { emptyCommunity } from '_slices/community-repo/community-repo.slice.constants';
import rest from '_services/rest/rest';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommunityCardComfyView from '../community-card-comfy/CommunityCardComfy.view';

import { NoCommunitiesView } from './NoCommunities.view';

const CommunityFeedView = () => {
  const { updatedAt: communitiesUpdatedAt, list: communities } = useSelector(
    selectCommunities
  );

  const retrieveCommunities = () => delayIfDev(() => rest.getCommunities());

  if (!communitiesUpdatedAt) {
    retrieveCommunities();
  } else if (Date.now() - communitiesUpdatedAt > 10000) {
    retrieveCommunities();
  }

  if (!communitiesUpdatedAt) {
    return skeletons();
  }

  if (!!communitiesUpdatedAt && !communities.length) {
    return <NoCommunitiesView />;
  }

  return (
    <>
      {communities &&
        communities.map((community) => (
          <CommunityCardComfyView
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
          <CommunityCardComfyView
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
