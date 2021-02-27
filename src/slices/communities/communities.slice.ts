import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import {
  CommunitiesGetRes,
  SetCommunities,
  SelectCommunities,
} from './communities.slice.types';
import { initialState } from './communities.slice.constants';

const { actions, reducer } = createSlice({
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

export default reducer;

export const setCommunities: SetCommunities = (communities) =>
  dispatch(actions.setCommunities(communities));

export const selectCommunities: SelectCommunities = (state) =>
  state.communities;
