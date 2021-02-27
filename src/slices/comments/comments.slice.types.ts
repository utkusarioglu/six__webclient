import type { RootState } from '_store/store';
import type { Selector } from '@reduxjs/toolkit';
import type {
  PostEndpoint_comments,
  CommentEndpoint_save,
  UserLoginResSuccessful,
  PostEndpoint_single,
} from '_types/public-api';
import type { AsSkeleton } from '_types/material-ui';
import type { uuid } from '_types/helpers';

export type Comment = PostEndpoint_comments['_get']['_res']['Success']['body'][0];

export type CommentSaveBody = CommentEndpoint_save['_post']['_req']['Body'] & {
  creatorUsername: UserLoginResSuccessful['username'];
  postSlug: PostEndpoint_single['_get']['_res']['Success']['body']['postSlug'];
};

/**
 * Shape of the comment object in the comments store
 */
export type StoreComment = Comment &
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

export type UpdateComments = (comments: Comment[]) => void;
export type PushIsSubmittingComment = (comment: CommentSaveBody) => void;
export type ReplaceIsSubmittingComment = (comment: Comment) => void;
export type ClearComments = () => void;
export type GetCommentsForPost = (
  postId: uuid
) => Selector<RootState, StoreComment[]>;
export type GetComments = Selector<RootState, CommentsState>;
