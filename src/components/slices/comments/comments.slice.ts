import { createSlice, Selector } from '@reduxjs/toolkit';
import { CommentsState, SliceComment, Comment } from './comments.slice.types';
import store from '_base/store/store';
import type { RootState } from '_base/store/store';
import { uuid } from '_base/@types/helpers';

const initialState: CommentsState = {
  receivedAt: 0,
  list: [],
};

function expandComment(comment: Comment): SliceComment {
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
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (_, { payload }) => {
      const received: Comment[] = payload;

      const expanded: SliceComment[] = received.map((comment) => {
        return expandComment(comment);
      });

      return {
        receivedAt: Date.now(),
        list: expanded,
      };
    },

    pushComment: (state, { payload }) => {
      const received: Comment = payload;

      const expanded: SliceComment = expandComment(received);
      return {
        ...state,
        list: [...state.list, expanded],
      };
    },

    clearComments: () => initialState,
  },
});

export default commentsSlice.reducer;

type UpdateComments = (comments: Comment[]) => void;
type PushComment = (comment: Comment) => void;
type ClearComments = () => void;
type GetCommentsForPost = (postId: uuid) => Selector<RootState, SliceComment[]>;
type GetComments = Selector<RootState, CommentsState>;

export const setComments: UpdateComments = (comments) =>
  store.dispatch(commentsSlice.actions.setComments(comments));

export const pushComment: PushComment = (comment) =>
  store.dispatch(commentsSlice.actions.pushComment(comment));

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
  postId: '',

  creatorUsername: '',
  userId: '',

  creatorSlug: '',
  creatorUrl: '',
  creatorStylizedUrl: '',

  asSkeleton: true,
};
