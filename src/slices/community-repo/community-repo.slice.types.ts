import {
  CommunityEp_list_res_body,
  CommunityEp_single_res_body,
} from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type ExpandedCommunity = CommunityEp_single_res_body & {
  communityUrl: string;
};

export type SetCommunities = (communities: CommunityEp_list_res_body) => void;

export type SelectCommunities = Selector<RootState, CommunitiesStore>;

export type CommunitiesStore = {
  updatedAt: number; // epoch
  list: ExpandedCommunity[];
};

export type AmendUcsParams = Pick<CommunityEp_single_res_body, 'id' | 'ucs'>;

export type AmendCommunityUcs = (params: AmendUcsParams) => void;
