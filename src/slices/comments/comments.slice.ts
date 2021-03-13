import type {
  PostEp_comments_res_body,
  PostEp_comment_res_body,
} from '_types/public-api';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  UpdateComments,
  PushIsSubmittingComment,
  ReplaceIsSubmittingComment,
  ClearComments,
  SelectCommentsForPost,
  SelectComments,
  ClearIsSubmittingComment,
} from './comments.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  StoreComment,
  IsSubmittingCommentParams,
} from './comments.slice.types';
import { dispatch } from '_store/store';
import { initialState } from './comments.slice.constants';
import { expandComment } from './comments.slice.logic';

const { actions, reducer } = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      _,
      { payload: comments }: PayloadAction<PostEp_comments_res_body>
    ) => {
      const expanded = comments.map((comment) => {
        return expandComment(comment);
      });

      return {
        receivedAt: Date.now(),
        list: expanded,
      };
    },

    pushIsSubmittingComment: (
      state,
      { payload }: PayloadAction<IsSubmittingCommentParams>
    ) => {
      const expanded: StoreComment = expandComment({
        ...payload,
        id: '',
        createdAt: '',
        likeCount: 1,
        dislikeCount: 0,
        state: 'is-submitting',
      });

      return {
        ...state,
        list: [expanded, ...state.list],
      };
    },

    replaceIsSubmittingComment: (
      state,
      { payload }: PayloadAction<PostEp_comment_res_body>
    ) => {
      const submittedMessages = state.list.filter(
        (comment) => comment.state !== 'is-submitting'
      );

      const expanded = expandComment(payload);

      return {
        ...state,
        list: [expanded, ...submittedMessages],
      };
    },

    clearIsSubmittingComment: (state) => {
      return {
        ...state,
        list: state.list.filter((comment) => comment.state !== 'is-submitting'),
      };
    },

    clearComments: () => initialState,
  },
});

export default reducer;

export const setComments: UpdateComments = (comments) =>
  dispatch(actions.setComments(comments));

export const pushIsSubmittingComment: PushIsSubmittingComment = (comment) =>
  dispatch(actions.pushIsSubmittingComment(comment));

export const replaceIsSubmittingComment: ReplaceIsSubmittingComment = (
  comment
) => dispatch(actions.replaceIsSubmittingComment(comment));

export const clearComments: ClearComments = () =>
  dispatch(actions.clearComments());

export const selectCommentsByPostSlug: SelectCommentsForPost = (postSlug) => (
  state
) => state.comments.list.filter((comment) => comment.postSlug === postSlug);

export const selectComments: SelectComments = (state) => state.comments;

export const clearIsSubmittingComment: ClearIsSubmittingComment = () =>
  dispatch(actions.clearIsSubmittingComment());
