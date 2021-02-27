import type {
  UpdatePosts,
  UpvotePost,
  PostExpanded,
  GetPostVotes,
  GetPostTitle,
  GetPostBySlug,
  GetPostRepo,
  GetPostRepoLastUpdate,
} from './posts-repo.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import store from '_store/store';
import { PostsGetRes } from '_types/public-api';
import { expandPost } from '_helpers/post/expandPost';
import { initialState } from './post-repo.slice.constants';

const postRepoSlice = createSlice({
  name: 'postRepo',
  initialState,
  reducers: {
    updatePosts: (_, action) => {
      const received: PostsGetRes = action.payload;
      const expanded: PostExpanded[] = received.map((post) => expandPost(post));

      return {
        updatedAt: Date.now(),
        list: expanded,
      };
    },

    clearPostRepo: () => initialState,

    upvotePost: (state, action) => {
      const altered = state.list.find((post) => post.id === action.payload);

      if (!altered) return state;

      altered.likeCount++;

      return {
        ...state,
        list: {
          ...state.list,
          altered,
        },
      };
    },
  },
});

export default postRepoSlice.reducer;

export const updatePostRepo: UpdatePosts = (posts) =>
  store.dispatch(postRepoSlice.actions.updatePosts(posts));

export const clearPostRepo = () => {
  store.dispatch(postRepoSlice.actions.clearPostRepo());
};

export const upvotePost: UpvotePost = (postSlug) =>
  store.dispatch(postRepoSlice.actions.upvotePost(postSlug));

export const getPostRepo: GetPostRepo = (state) => state.postRepo;

export const getPostRepoLastUpdate: GetPostRepoLastUpdate = (state) => {
  return Date.now() - state.postRepo.updatedAt;
};

export const getPostVotes: GetPostVotes = (postSlug) => (state) => {
  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) {
    return {
      likeCount: 1,
      dislikeCount: 0,
      voteCount: 0,
    };
  }

  const { likeCount, dislikeCount, voteCount } = post;

  return {
    likeCount,
    dislikeCount,
    voteCount,
  };
};

export const getPostBySlug: GetPostBySlug = (postSlug) => (state) => {
  if (!postSlug || postSlug.length === 0) return null;

  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post;
};

export const getPostTitle: GetPostTitle = (postSlug) => (state) => {
  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post.postTitle;
};
