import type { CommunityEndpoint_list } from '_types/public-api';
import { createSlice, Selector } from '@reduxjs/toolkit';
import store, { RootState } from '_store/store';

type CommunitiesGetRes = CommunityEndpoint_list['_get']['_res']['Success']['body'];

export type CommunityExpanded = CommunitiesGetRes[0];

type CommunitiesSlice = {
  updatedAt: number; // epoch
  list: CommunityExpanded[];
};

const initialState: CommunitiesSlice = {
  updatedAt: 0,
  list: [],
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    setCommunities: (_, action) => {
      const received: CommunitiesGetRes = action.payload;
      return {
        updatedAt: Date.now(),
        list: received,
      };
    },
  },
});

export default communitiesSlice.reducer;

type SetCommunities = (communities: CommunitiesGetRes) => void;
type GetCommunities = Selector<RootState, CommunitiesSlice>;

export const setCommunities: SetCommunities = (communities) =>
  store.dispatch(communitiesSlice.actions.setCommunities(communities));

export const getCommunities: GetCommunities = (state) => state.communities;

export const emptyCommunity: CommunityExpanded = {
  id: '',
  createdAt: '',
  description: '',
  name: '',
  slug: '',
  postCount: 0,
  subscriberCount: 0,
};
