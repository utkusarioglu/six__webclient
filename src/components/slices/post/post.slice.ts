import { createSlice, Selector } from '@reduxjs/toolkit';
import store, { RootState } from '_base/store/store';
import { PostExpanded } from '../post-repo/posts-repo.slice.types';
import { PostGetRes } from 'six__public-api';
import { expandPost } from '_helpers/post/expandPost';

// type NoPost = { allowView: boolean };

type PostState = PostExpanded;

const initialState: PostState = {
  allowView: false,
  id: '',
  createdAt: '',
  postTitle: '',
  postBody: '',
  postSlug: '',
  likeCount: 0,
  dislikeCount: 0,
  commentCount: 0,
  creatorUsername: '',
  communityName: '',
  communitySlug: '',
  mediaImagePath: '',
  mediaType: 'none',
  receivedAt: 0,
  communityUrl: '',
  communityStylizedUrl: '',
  postUrl: '',
  creatorUrl: '',
  creatorSlug: '',
  creatorStylizedUrl: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_, action) => {
      return expandPost(action.payload);
    },
    clearPost: () => initialState,
  },
});

export default postSlice.reducer;

type SetPost = (post: PostGetRes['res']) => void;

export const setPost: SetPost = (post) =>
  store.dispatch(postSlice.actions.setPost(post));

export const clearPost = () => {
  store.dispatch(postSlice.actions.clearPost());
};

type GetPost = Selector<RootState, PostState>;

export const getPost: GetPost = (state) => state.post;

/**
 * Can be used for skeletons
 */
export const emptyPost = initialState;
