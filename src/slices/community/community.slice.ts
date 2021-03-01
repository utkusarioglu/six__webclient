import type { CommunityEndpoint_single_res_body } from '_types/public-api';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  SetCommunity,
  SelectCommunity,
  SelectCommunityId,
  ClearCommunity,
} from './community.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { initialState } from './community.slice.constants';
import { expandCommunity } from '_slices/@shared/expandCommunity';

const { actions, reducer } = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCommunity: (
      _,
      { payload }: PayloadAction<CommunityEndpoint_single_res_body>
    ) => {
      return expandCommunity(payload);
    },
    clearCommunity: () => initialState,
  },
});

export default reducer;

export const setCommunity: SetCommunity = (communityBody) =>
  dispatch(actions.setCommunity(communityBody));

export const clearCommunity: ClearCommunity = () => {
  dispatch(actions.clearCommunity());
};

export const selectCommunity: SelectCommunity = (state) => state.community;

export const selectCommunityId: SelectCommunityId = (state) =>
  state.community.id;
