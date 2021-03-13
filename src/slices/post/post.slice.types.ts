import {
  PostEp_single_res_body,
  PostEp_single_res_body_id,
} from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type PostState = PostEp_single_res_body & {
  receivedAt: number; // epoch
  allowView: boolean;
  communitySlug: string;
  creatorSlug: string;
  communityUrl: string;
  communityStylizedUrl: string;
  creatorUrl: string;
  creatorStylizedUrl: string;
  postUrl: string;
  voteCount: number;
};

export type SelectPost = Selector<RootState, PostState>;

export type SelectPostId = Selector<RootState, PostEp_single_res_body_id>;

// export type PostSingleBody = PostEndpoint_single_res_body;

export type SetPost = (postBody: PostEp_single_res_body) => void;

export type ClearPost = () => void;
