import { configureStore } from '@reduxjs/toolkit';
import postRepoReducer from '_base/components/slices/post-repo/posts-repo.slice';
import commentsReducer from '_slices/comments/comments.slice';
import userReducer from '_slices/user/user.slice';

/**
 * The actual store for the app
 */
const store = configureStore({
  reducer: {
    postRepo: postRepoReducer,
    comments: commentsReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
