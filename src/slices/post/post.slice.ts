import { createSlice, Selector } from '@reduxjs/toolkit';
import store, { RootState } from '_store/store';
import { PostExpanded } from '_slices/post-repo/posts-repo.slice.types';
import { PostEndpoint } from 'six__public-api';
import { expandPost } from '_helpers/post/expandPost';

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
  voteCount: 0,
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

type SetPost = (
  postBody: PostEndpoint['_single']['_v1']['_get']['_res']['Success']['body']
) => void;

export const setPost: SetPost = (postBody) =>
  store.dispatch(postSlice.actions.setPost(postBody));

export const clearPost = () => {
  store.dispatch(postSlice.actions.clearPost());
};

type GetPost = Selector<RootState, PostState>;
type GetPostId = Selector<RootState, PostState['id']>;

export const getPost: GetPost = (state) => state.post;
export const getPostId: GetPostId = (state) => state.post.id;

/**
 * Can be used for skeletons
 */
export const emptyPost = initialState;
