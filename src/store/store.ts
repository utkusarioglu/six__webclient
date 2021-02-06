import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '_slices/posts/posts.slice';
import commentsReducer from '_slices/comments/comments.slice';
import userReducer from '_slices/user/user.slice';

/**
 * The actual store for the app
 */
const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
