import type { CommentsGetRes } from 'six__public-api';
import { createSlice, Selector } from '@reduxjs/toolkit';
import { CommentsState, SliceComment } from './comments.slice.types';
import store from '_base/store/store';
import type { RootState } from '_base/store/store';
import { uuid } from '_base/@types/helpers';

const initialState: CommentsState = {
  list: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    updateComments: (state, { payload }) => {
      const received: CommentsGetRes['res'] = payload;

      const expanded: SliceComment[] = received.map((comment) => {
        const { creatorUsername } = comment;
        const creatorSlug = creatorUsername.toLowerCase();

        return {
          ...comment,
          creatorSlug,
          creatorStylizedUrl: `u/${creatorUsername}`,
          creatorUrl: `u/${creatorSlug}`,
        };
      });

      return {
        ...state,
        list: expanded,
      };
    },
  },
});

export default commentsSlice.reducer;

type UpdateComments = (comments: CommentsGetRes['res']) => void;
type GetCommentsForPost = (postId: uuid) => Selector<RootState, SliceComment[]>;

export const updateComments: UpdateComments = (comments) =>
  store.dispatch(commentsSlice.actions.updateComments(comments));

export const getCommentsByPostSlug: GetCommentsForPost = (postSlug) => (
  state
) => state.comments.list.filter((comment) => comment.postSlug === postSlug);
