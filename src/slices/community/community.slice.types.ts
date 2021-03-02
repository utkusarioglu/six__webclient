import {
  CommunityEndpoint_single_res_body,
  CommunityEndpoint_single_res_body_id,
} from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type CommunityState = CommunityEndpoint_single_res_body & {
  communityUrl: string;
  receivedAt: number; // epoch
  allowView: boolean;
};

export type SelectCommunity = Selector<RootState, CommunityState>;

export type SelectCommunityId = Selector<
  RootState,
  CommunityEndpoint_single_res_body_id
>;

// export type CommunitySingleBody = CommunityEndpoint_single_res_body;

export type SetCommunity = (
  communityBody: CommunityEndpoint_single_res_body
) => void;

export type ClearCommunity = () => void;
