import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CommunitiesGetRes,
  SetCommunities,
  SelectCommunities,
} from './communities.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { initialState } from './communities.slice.constants';

const { actions, reducer } = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    setCommunities: (
      _,
      { payload: communities }: PayloadAction<CommunitiesGetRes>
    ) => {
      return {
        updatedAt: Date.now(),
        list: communities,
      };
    },
  },
});

export default reducer;

export const setCommunities: SetCommunities = (communities) =>
  dispatch(actions.setCommunities(communities));

export const selectCommunities: SelectCommunities = (state) =>
  state.communities;
