import type {
  UpdateComments,
  PushIsSubmittingComment,
  ReplaceIsSubmittingComment,
  ClearComments,
  GetCommentsForPost,
  GetComments,
} from './comments.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { StoreComment, Comment, CommentSaveBody } from './comments.slice.types';
import store from '_store/store';
import { initialState } from './comments.slice.constants';
import { expandComment } from './comments.slice.logic';

const commentsSlice = createSlice({
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

export default commentsSlice.reducer;

export const setComments: UpdateComments = (comments) =>
  store.dispatch(commentsSlice.actions.setComments(comments));

export const pushIsSubmittingComment: PushIsSubmittingComment = (comment) =>
  store.dispatch(commentsSlice.actions.pushIsSubmittingComment(comment));

export const replaceIsSubmittingComment: ReplaceIsSubmittingComment = (
  comment
) => store.dispatch(commentsSlice.actions.replaceIsSubmittingComment(comment));

export const clearComments: ClearComments = () => {
  store.dispatch(commentsSlice.actions.clearComments());
};

export const getCommentsByPostSlug: GetCommentsForPost = (postSlug) => (
  state
) => state.comments.list.filter((comment) => comment.postSlug === postSlug);

export const getComments: GetComments = (state) => state.comments;
