import type {
  PostsState,
  UpdatePosts,
  UpvotePost,
  PostExpanded,
} from './posts-repo.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import store from '_store/store';
import { Selector } from '_base/@types/helpers';
import { PostsGetRes } from 'six__public-api';
import { expandPost } from '_helpers/post/expandPost';

const initialState: PostsState = {
  updatedAt: 0,
  list: [],
};

const postRepoSlice = createSlice({
  name: 'postRepo',
  initialState,
  reducers: {
    updatePosts: (_, action) => {
      const received: PostsGetRes['res'] = action.payload;
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

export const getPostRepo: Selector<PostsState> = (state) => state.postRepo;

export const getPostRepoLastUpdate: Selector<PostsState['updatedAt']> = (
  state
) => {
  return Date.now() - state.postRepo.updatedAt;
};

type VoteStats = Pick<
  PostsState['list'][0],
  'likeCount' | 'dislikeCount' | 'voteCount'
>;

type GetPostVotes = (
  postId: PostsState['list'][0]['id']
) => Selector<VoteStats>;

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

type SelectPost = PostsState['list'][0] | null;

export const getPostBySlug: (
  postSlug: PostsState['list'][0]['postSlug']
) => Selector<SelectPost> = (postSlug) => (state) => {
  if (!postSlug || postSlug.length === 0) return null;

  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post;
};

export const getPostTitle: (
  postSlug: string
) => Selector<PostsState['list'][0]['postTitle'] | null> = (postSlug) => (
  state
) => {
  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post.postTitle;
};
