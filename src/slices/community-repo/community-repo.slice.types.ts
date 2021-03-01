import {
  CommunityEndpoint_list_res_body,
  CommunityEndpoint_single_res_body,
} from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type ExpandedCommunity = CommunityEndpoint_single_res_body & {
  communityUrl: string;
};

export type SetCommunities = (
  communities: CommunityEndpoint_list_res_body
) => void;

export type SelectCommunities = Selector<RootState, CommunitiesStore>;

export type CommunitiesStore = {
  updatedAt: number; // epoch
  list: ExpandedCommunity[];
};
