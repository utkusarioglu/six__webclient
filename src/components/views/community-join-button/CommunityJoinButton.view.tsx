import type { FC } from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import rest from '_services/rest/rest';
import snacks from '_services/snacks/snacks';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import { amendCommunityRepoUcs } from '_slices/community-repo/community-repo.slice';
import { amendCommunityDetailsUcs } from '_slices/community/community.slice';
import type { StoreUser } from '_slices/user/user.slice.types';
import type { AmendCommunityDetailsUcsParams } from '_slices/community/community.slice.types';

type CommunityJoinButtonViewProps = {
  user: StoreUser;
} & AmendCommunityDetailsUcsParams;

const CommunityJoinButtonView: FC<CommunityJoinButtonViewProps> = ({
  user,
  id,
  ucs,
}) => {
  const [subscribeButtonEnabled, setSubscribeButtonEnabled] = useState(true);

  const subscribeOnClick = () => {
    if (user.state === 'logged-in') {
      setSubscribeButtonEnabled(false);
      delayIfDev(() => {
        if (ucs) {
          rest
            .userCommunitySubscription(user.id, id, 'unsubscribe')
            .then((data) => {
              if (data && data.state === 'success') {
                snacks.push('communityUnsubscribed');
                amendCommunityRepoUcs({ id, ucs: false });
                amendCommunityDetailsUcs({ id, ucs: false });
              } else {
                snacks.push('communitySubscriptionFail');
              }
              setSubscribeButtonEnabled(true);
            });
        } else {
          rest
            .userCommunitySubscription(user.id, id, 'subscribe')
            .then((data) => {
              if (data && data.state === 'success') {
                snacks.push('communitySubscribed');
                amendCommunityRepoUcs({ id, ucs: true });
                amendCommunityDetailsUcs({ id, ucs: true });
              } else {
                snacks.push('communitySubscriptionFail');
              }
              setSubscribeButtonEnabled(true);
            });
        }
      });
    } else {
      snacks.push('visitorIllegalActionError');
    }
  };

  return (
    <>
      {user.state === 'logged-in' && (
        <Button
          size="small"
          color="primary"
          onClick={subscribeOnClick}
          disabled={!subscribeButtonEnabled}
        >
          {ucs ? 'Joined' : 'Join'}
        </Button>
      )}
    </>
  );
};

export default CommunityJoinButtonView;
