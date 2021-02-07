import type { CommentsGetRes } from 'six__public-api';
import { createSlice, Selector } from '@reduxjs/toolkit';
import { CommentsState, SliceComment } from './comments.slice.types';
import store from '_base/store/store';
import type { RootState } from '_base/store/store';
import { uuid } from '_base/@types/helpers';

const initialState: CommentsState = {
  receivedAt: 0,
  list: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (_, { payload }) => {
      const received: CommentsGetRes['res'] = payload;

      const expanded: SliceComment[] = received.map((comment) => {
        const { creatorUsername, likeCount, dislikeCount } = comment;
        const creatorSlug = creatorUsername.toLowerCase();

        return {
          ...comment,
          creatorSlug,
          creatorStylizedUrl: `u/${creatorUsername}`,
          creatorUrl: `u/${creatorSlug}`,
          asSkeleton: false,
          voteCount: likeCount - dislikeCount,
        };
      });

      return {
        receivedAt: Date.now(),
        list: expanded,
      };
    },

    clearComments: () => initialState,
  },
});

export default commentsSlice.reducer;

type UpdateComments = (comments: CommentsGetRes['res']) => void;
type ClearComments = () => void;
type GetCommentsForPost = (postId: uuid) => Selector<RootState, SliceComment[]>;
type GetComments = Selector<RootState, CommentsState>;

export const setComments: UpdateComments = (comments) =>
  store.dispatch(commentsSlice.actions.setComments(comments));

export const clearComments: ClearComments = () => {
  store.dispatch(commentsSlice.actions.clearComments());
};

export const getCommentsByPostSlug: GetCommentsForPost = (postSlug) => (
  state
) => state.comments.list.filter((comment) => comment.postSlug === postSlug);

export const getComments: GetComments = (state) => state.comments;

/**
 * useful for providing skeletons with props
 */
export const emptyComment: SliceComment = {
  id: '',
  parentId: null,
  createdAt: '',
  body: '',
  likeCount: 0,
  dislikeCount: 0,
  voteCount: 0,
  postSlug: '',
  creatorUsername: '',
  creatorSlug: '',
  creatorUrl: '',
  creatorStylizedUrl: '',
  asSkeleton: true,
};
