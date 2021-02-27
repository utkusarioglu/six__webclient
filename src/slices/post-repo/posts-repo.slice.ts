import type {
  UpdatePosts,
  UpvotePost,
  PostExpanded,
  SelectPostVotes,
  SelectPostTitle,
  SelectPostBySlug,
  SelectPostRepo,
  SelectPostRepoLastUpdate,
  PostGetResBodyId,
} from './posts-repo.slice.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { PostsGetRes } from '_types/public-api';
import { expandPost } from '_helpers/post/expandPost';
import { initialState } from './post-repo.slice.constants';

const { actions, reducer } = createSlice({
  name: 'postRepo',
  initialState,
  reducers: {
    updatePosts: (_, { payload: posts }: PayloadAction<PostsGetRes>) => {
      const expanded: PostExpanded[] = posts.map((post) => expandPost(post));

      return {
        updatedAt: Date.now(),
        list: expanded,
      };
    },

    clearPostRepo: () => initialState,

    upvotePost: (state, { payload }: PayloadAction<PostGetResBodyId>) => {
      const altered = state.list.find((post) => post.id === payload);

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

export default reducer;

export const updatePostRepo: UpdatePosts = (posts) =>
  dispatch(actions.updatePosts(posts));

export const clearPostRepo = () => {
  dispatch(actions.clearPostRepo());
};

export const upvotePost: UpvotePost = (postSlug) =>
  dispatch(actions.upvotePost(postSlug));

export const selectPostRepo: SelectPostRepo = (state) => state.postRepo;

export const selectPostRepoLastUpdate: SelectPostRepoLastUpdate = (state) => {
  return Date.now() - state.postRepo.updatedAt;
};

export const selectPostVotes: SelectPostVotes = (postSlug) => (state) => {
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

export const selectPostBySlug: SelectPostBySlug = (postSlug) => (state) => {
  if (!postSlug || postSlug.length === 0) return null;

  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post;
};

export const selectPostTitle: SelectPostTitle = (postSlug) => (state) => {
  const post = state.postRepo.list.find((post) => post.postSlug === postSlug);

  if (!post) return null;

  return post.postTitle;
};
