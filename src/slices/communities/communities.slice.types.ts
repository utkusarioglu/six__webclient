import {
  CommunityEndpoint_list,
  CommunityEndpoint_single,
} from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type CommunitiesGetRes = CommunityEndpoint_list['_get']['_res']['Success']['body'];

export type StoreCommunity = CommunityEndpoint_single['_get']['_res']['Success']['body'];
export type SetCommunities = (communities: CommunitiesGetRes) => void;
export type GetCommunities = Selector<RootState, CommunitiesSlice>;
export type CommunitiesSlice = {
  updatedAt: number; // epoch
  list: StoreCommunity[];
};
