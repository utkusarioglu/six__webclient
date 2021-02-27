import type {
  PostEndpoint_single_res_body,
  PostEndpoint_single_res_body_id,
  PostEndpoint_list_res_body,
} from '_types/public-api';
import type { RootState } from '_store/store';
import type { Selector } from '@reduxjs/toolkit';

export interface PostsState {
  updatedAt: number;
  list: StorePost[];
}

/**
 * Expands the received post object with properties required by some components
 */
export type StorePost = PostEndpoint_single_res_body & {
  receivedAt: number; // epoch
  // used to check whether post can be displayed on screen, useful
  // in some scenarios
  allowView: boolean;

  communityUrl: string;
  communityStylizedUrl: string;
  communitySlug: string;

  postUrl: string;

  creatorUrl: string;
  creatorSlug: string;
  creatorStylizedUrl: string;

  voteCount: number;
};

export type UpdatePosts = (posts: PostEndpoint_list_res_body) => void;

export type UpvotePost = (postId: PostEndpoint_single_res_body_id) => void;

export type VoteStats = Pick<
  PostsState['list'][0],
  'likeCount' | 'dislikeCount' | 'voteCount'
>;

export type SelectPostVotes = (
  postId: PostEndpoint_single_res_body_id
) => Selector<RootState, VoteStats>;
type SelectPost = PostsState['list'][0] | null;

export type SelectPostTitle = (
  postSlug: string
) => Selector<RootState, PostsState['list'][0]['postTitle'] | null>;

export type SelectPostBySlug = (
  postSlug: PostsState['list'][0]['postSlug']
) => Selector<RootState, SelectPost>;

export type SelectPostRepo = Selector<RootState, PostsState>;

export type SelectPostRepoLastUpdate = Selector<
  RootState,
  PostsState['updatedAt']
>;
