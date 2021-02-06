import type {
  PostsState,
  UpdatePosts,
  UpvotePost,
  PostExpanded,
} from './posts.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import store from '_store/store';
import { Selector } from '_base/@types/helpers';
import { PostsGetRes } from 'six__public-api';

const initialState: PostsState = {
  lastUpdate: 0,
  list: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePosts: (_, action) => {
      const received: PostsGetRes['res'] = action.payload;
      const expanded: PostExpanded[] = received.map((post) => {
        const { communityName, creatorUsername, postSlug } = post;

        const communitySlug = communityName.toLowerCase();
        const creatorSlug = creatorUsername.toLowerCase();

        return {
          ...post,
          communitySlug,
          creatorSlug,
          communityUrl: `r/${communitySlug}`,
          communityStylizedUrl: `r/${communityName}`,
          creatorUrl: `u/${creatorSlug}`,
          creatorStylizedUrl: `u/${creatorUsername}`,
          postUrl: `r/${communitySlug}/${postSlug}`,
        };
      });

      return {
        lastUpdate: Date.now(),
        list: expanded,
      };
    },

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

export default postsSlice.reducer;

export const updatePosts: UpdatePosts = (posts) =>
  store.dispatch(postsSlice.actions.updatePosts(posts));

export const upvotePost: UpvotePost = (postSlug) =>
  store.dispatch(postsSlice.actions.upvotePost(postSlug));

export const getPostsList: Selector<PostsState['list']> = (state) =>
  state.posts.list;

export const getPostsAge: Selector<PostsState['lastUpdate']> = (state) => {
  return Date.now() - state.posts.lastUpdate;
};

type VoteStats = Pick<PostsState['list'][0], 'likeCount' | 'dislikeCount'> & {
  voteCount: number;
};

type GetPostVotes = (
  postId: PostsState['list'][0]['id']
) => Selector<VoteStats>;

export const getPostVotes: GetPostVotes = (postSlug) => (state) => {
  const post = state.posts.list.find((post) => post.postSlug === postSlug);

  if (!post)
    return {
      likeCount: 1,
      dislikeCount: 0,
      voteCount: 0,
    };

  const { likeCount, dislikeCount } = post;

  return {
    likeCount,
    dislikeCount,
    voteCount: likeCount - dislikeCount,
  };
};

type SelectPost = PostsState['list'][0] | null;

export const getPostBySlug: (
  postSlug: PostsState['list'][0]['postSlug']
) => Selector<SelectPost> = (postSlug) => (state) => {
  if (!postSlug || postSlug.length === 0) return null;

  const post = state.posts.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post;
};

export const getPostTitle: (
  postSlug: string
) => Selector<PostsState['list'][0]['postTitle'] | null> = (postSlug) => (
  state
) => {
  const post = state.posts.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post.postTitle;
};
