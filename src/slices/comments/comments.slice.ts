import type {
  UpdateComments,
  PushIsSubmittingComment,
  ReplaceIsSubmittingComment,
  ClearComments,
  SelectCommentsForPost,
  SelectComments,
} from './comments.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { StoreComment, Comment, CommentSaveBody } from './comments.slice.types';
import { dispatch } from '_store/store';
import { initialState } from './comments.slice.constants';
import { expandComment } from './comments.slice.logic';

const { actions, reducer } = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (_, { payload }) => {
      const received: Comment[] = payload;

      const expanded: StoreComment[] = received.map((comment) => {
        return expandComment(comment);
      });

      return {
        receivedAt: Date.now(),
        list: expanded,
      };
    },

    pushIsSubmittingComment: (state, { payload }) => {
      const received: CommentSaveBody = payload;

      const expanded: StoreComment = expandComment({
        ...received,
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

    replaceIsSubmittingComment: (state, { payload }) => {
      const received: Comment = payload;
      const submittedMessages = state.list.filter(
        (comment) => comment.state !== 'is-submitting'
      );

      const expanded = expandComment(received);

      return {
        ...state,
        list: [expanded, ...submittedMessages],
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

export const clearComments: ClearComments = () => {
  dispatch(actions.clearComments());
};

export const selectCommentsByPostSlug: SelectCommentsForPost = (postSlug) => (
  state
) => state.comments.list.filter((comment) => comment.postSlug === postSlug);

export const selectComments: SelectComments = (state) => state.comments;
