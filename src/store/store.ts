import { configureStore } from '@reduxjs/toolkit';
import postRepo from '_slices/post-repo/posts-repo.slice';
import comments from '_slices/comments/comments.slice';
import user from '_slices/user/user.slice';
import post from '_slices/post/post.slice';
import communityRepo from '_slices/community-repo/community-repo.slice';
import snackKeys from '_slices/snack-keys/snack-keys.slice';
import ucs from '_slices/ucs/ucs.slice';
import community from '_slices/community/community.slice';

/**
 * The actual store for the app
 */
const store = configureStore({
  reducer: {
    post,
    postRepo,
    comments,
    user,
    communityRepo,
    snackKeys,
    ucs,
    community,
  },
});

export default store;
export const { dispatch, subscribe, getState } = store;
export type RootState = ReturnType<typeof store.getState>;
