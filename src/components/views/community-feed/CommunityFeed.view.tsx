import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCommunities } from '_slices/community-repo/community-repo.slice';
import { emptyCommunity } from '_slices/community-repo/community-repo.slice.constants';
import rest from '_services/rest/rest';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommunityCardComfyView from '_views/community-card-comfy/CommunityCardComfy.view';
import CommunityCardCompactView from '_views/community-card-compact/CommunityCardCompact.view';
import Container from '@material-ui/core/Container';
import CardDensitySelectView from '_views/card-density-select/CardDensitySelect.view';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { NoCommunitiesView } from './NoCommunities.view';

type CommunityCardTypes = 'comfy' | 'compact';

export type SelectOnChange = (e: ChangeEvent<{ value: unknown }>) => void;

const CommunityFeedView: FC<{}> = () => {
  const { updatedAt: communitiesUpdatedAt, list: communities } = useSelector(
    selectCommunities
  );
  const [cardType, setCardType] = useState<CommunityCardTypes>('compact');
  const retrieveCommunities = () => delayIfDev(() => rest.getCommunities());

  if (!communitiesUpdatedAt) {
    retrieveCommunities();
  } else if (Date.now() - communitiesUpdatedAt > 10000) {
    retrieveCommunities();
  }

  if (!communitiesUpdatedAt) {
    return CommunityCardComfySkeletons();
  }

  if (!!communitiesUpdatedAt && !communities.length) {
    return <NoCommunitiesView />;
  }

  const selectCardTypeOnChange: SelectOnChange = (e) => {
    const value = e.target.value as CommunityCardTypes;
    setCardType(value);
  };

  return (
    <>
      <Container>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6">Communities</Typography>
          <CardDensitySelectView
            cardType={cardType}
            onChange={selectCardTypeOnChange}
          />
        </Grid>
      </Container>
      <Container disableGutters>
        {communities &&
          cardType === 'comfy' &&
          communities.map((community) => (
            <CommunityCardComfyView
              {...{ key: community.id, asSkeleton: false, ...community }}
            />
          ))}
        {communities &&
          cardType === 'compact' &&
          communities.map((community) => (
            <CommunityCardCompactView
              {...{ key: community.id, asSkeleton: false, ...community }}
            />
          ))}
      </Container>
    </>
  );
};

function CommunityCardComfySkeletons() {
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
