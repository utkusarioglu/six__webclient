import { configureStore } from '@reduxjs/toolkit';
import postRepoReducer from '_slices/post-repo/posts-repo.slice';
import commentsReducer from '_slices/comments/comments.slice';
import userReducer from '_slices/user/user.slice';
import postReducer from '_slices/post/post.slice';
import communitiesReducer from '_slices/communities/communities.slice';
import snacksReducer from '_slices/snacks/snacks.slice';

/**
 * The actual store for the app
 */
const store = configureStore({
  reducer: {
    post: postReducer,
    postRepo: postRepoReducer,
    comments: commentsReducer,
    user: userReducer,
    communities: communitiesReducer,
    snacks: snacksReducer,
  },
});

export default store;
export const { dispatch, subscribe, getState } = store;
export type RootState = ReturnType<typeof store.getState>;
