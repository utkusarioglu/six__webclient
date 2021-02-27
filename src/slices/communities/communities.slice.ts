import type { CommunityEndpoint_list_res_body } from '_types/public-api';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
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
      { payload: communities }: PayloadAction<CommunityEndpoint_list_res_body>
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
