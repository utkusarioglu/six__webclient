import { useSelector } from 'react-redux';
import { selectCommunities } from '_slices/community-repo/community-repo.slice';
import { emptyCommunity } from '_slices/community-repo/community-repo.slice.constants';
import rest from '_services/rest/rest';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommunityCardView from '../community-card/CommunityCard.view';
import { selectUcsIds } from '_slices/ucs/ucs.slice';
import { selectUser } from '_slices/user/user.slice';
import { NoCommunitiesView } from './NoCommunities.view';

const CommunityFeedView = () => {
  const { updatedAt: communitiesUpdatedAt, list: communities } = useSelector(
    selectCommunities
  );
  const user = useSelector(selectUser);
  const { updatedAt: ucsUpdatedAt } = useSelector(selectUcsIds);
  const retrieveCommunities = () => delayIfDev(() => rest.getCommunities());

  if (!communitiesUpdatedAt) {
    retrieveCommunities();
  } else if (Date.now() - communitiesUpdatedAt > 10000) {
    retrieveCommunities();
  }

  if (user.state !== 'visitor') {
    const retrieveUcs = () =>
      delayIfDev(() => rest.getUcsIdsForUserId(user.id));

    if (!ucsUpdatedAt) {
      retrieveUcs();
    } else if (Date.now() - ucsUpdatedAt > 10000) {
      retrieveUcs();
    }
  }

  if (!communitiesUpdatedAt || (user.state !== 'visitor' && !ucsUpdatedAt)) {
    return skeletons();
  }

  if (!!communitiesUpdatedAt && !communities.length) {
    return <NoCommunitiesView />;
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
