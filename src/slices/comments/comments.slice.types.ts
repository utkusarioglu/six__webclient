import type { RootState } from '_store/store';
import type { Selector } from '@reduxjs/toolkit';
import type {
  PostEp_single_res_body_slug,
  PostEp_comment_res_body,
  PostEp_comments_res_body,
  CommentEp_save_req_body,
  UserEp_session_res_body_success_username,
  PostEp_single_res_body_id,
} from '_types/public-api';
import type { AsSkeleton } from '_types/material-ui';

export type IsSubmittingCommentParams = CommentEp_save_req_body & {
  creatorUsername: UserEp_session_res_body_success_username;
  postSlug: PostEp_single_res_body_slug;
};

/**
 * Shape of the comment object in the comments store
 */
export type StoreComment = PostEp_comment_res_body &
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

export type UpdateComments = (comments: PostEp_comments_res_body) => void;

export type PushIsSubmittingComment = (
  comment: IsSubmittingCommentParams
) => void;

export type ReplaceIsSubmittingComment = (
  comment: PostEp_comment_res_body
) => void;

export type ClearComments = () => void;

export type SelectCommentsForPost = (
  postId: PostEp_single_res_body_id
) => Selector<RootState, StoreComment[]>;

export type SelectComments = Selector<RootState, CommentsState>;

export type ClearIsSubmittingComment = () => void;
