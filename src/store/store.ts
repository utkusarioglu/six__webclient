import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '_slices/posts/posts.slice';

/**
 * The actual store for the app
 */
const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
