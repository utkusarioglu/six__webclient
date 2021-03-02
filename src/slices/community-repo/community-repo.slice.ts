import type { CommunityEndpoint_list_res_body } from '_types/public-api';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  SetCommunities,
  SelectCommunities,
  AmendCommunityUcs,
  AmendUcsParams,
} from './community-repo.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { initialState } from './community-repo.slice.constants';
import { expandCommunity } from '_slices/@shared/expandCommunity';

const { actions, reducer } = createSlice({
  name: 'communityRepo',
  initialState,
  reducers: {
    setCommunities: (
      _,
      { payload }: PayloadAction<CommunityEndpoint_list_res_body>
    ) => {
      const expanded = payload.map((community) => expandCommunity(community));

      return {
        updatedAt: Date.now(),
        list: expanded,
      };
    },

    amendUcs: (
      state,
      { payload: { id, ucs } }: PayloadAction<AmendUcsParams>
    ) => {
      const amended = state.list.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            ucs,
          };
        }
        return c;
      });

      return {
        ...state,
        list: amended,
      };
    },
  },
});

export default reducer;

export const setCommunities: SetCommunities = (communities) =>
  dispatch(actions.setCommunities(communities));

export const selectCommunities: SelectCommunities = (state) =>
  state.communityRepo;

export const amendCommunityRepoUcs: AmendCommunityUcs = (params) =>
  dispatch(actions.amendUcs(params));
