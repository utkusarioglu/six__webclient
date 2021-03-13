import {
  CommunityEp_single_res_body,
  CommunityEp_single_res_body_id,
} from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type CommunityState = CommunityEp_single_res_body & {
  communityUrl: string;
  receivedAt: number; // epoch
  allowView: boolean;
};

export type SelectCommunity = Selector<RootState, CommunityState>;

export type SelectCommunityId = Selector<
  RootState,
  CommunityEp_single_res_body_id
>;

export type SetCommunity = (communityBody: CommunityEp_single_res_body) => void;

export type ClearCommunity = () => void;

export type AmendCommunityDetailsUcsParams = Pick<
  CommunityEp_single_res_body,
  'id' | 'ucs'
>;

export type AmendCommunityDetailsUcs = (
  params: AmendCommunityDetailsUcsParams
) => void;
