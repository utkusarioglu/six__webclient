import { createSlice } from '@reduxjs/toolkit';
import store from '_store/store';
import {
  CommunitiesGetRes,
  SetCommunities,
  GetCommunities,
} from './communities.slice.types';
import { initialState } from './communities.slice.constants';

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

export const setCommunities: SetCommunities = (communities) =>
  store.dispatch(communitiesSlice.actions.setCommunities(communities));

export const getCommunities: GetCommunities = (state) => state.communities;
