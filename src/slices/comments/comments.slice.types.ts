import type { RootState } from '_store/store';
import type { Selector } from '@reduxjs/toolkit';
import type {
  PostEndpoint_single_res_body_slug,
  PostEndpoint_comment_res_body,
  PostEndpoint_comments_res_body,
  CommentEndpoint_save_req_body,
  UserEndpoint_session_res_body_success_username,
  PostEndpoint_single_res_body_id,
} from '_types/public-api';
import type { AsSkeleton } from '_types/material-ui';

export type IsSubmittingCommentParams = CommentEndpoint_save_req_body & {
  creatorUsername: UserEndpoint_session_res_body_success_username;
  postSlug: PostEndpoint_single_res_body_slug;
};

/**
 * Shape of the comment object in the comments store
 */
export type StoreComment = PostEndpoint_comment_res_body &
  AsSkeleton & {
    creatorSlug: string;
    creatorUrl: string; // url
    creatorStylizedUrl: string;
    voteCount: number;
  };

/**
 * Shape of the Comments slice state
 */
export type CommentsState = {
  receivedAt: number; // epoch
  list: StoreComment[];
};

export type UpdateComments = (comments: PostEndpoint_comments_res_body) => void;

export type PushIsSubmittingComment = (
  comment: IsSubmittingCommentParams
) => void;

export type ReplaceIsSubmittingComment = (
  comment: PostEndpoint_comment_res_body
) => void;

export type ClearComments = () => void;

export type SelectCommentsForPost = (
  postId: PostEndpoint_single_res_body_id
) => Selector<RootState, StoreComment[]>;

export type SelectComments = Selector<RootState, CommentsState>;
