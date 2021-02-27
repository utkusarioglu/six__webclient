import { configureStore } from '@reduxjs/toolkit';
import postRepoReducer from '_slices/post-repo/posts-repo.slice';
import commentsReducer from '_slices/comments/comments.slice';
import userReducer from '_slices/user/user.slice';
import postReducer from '_slices/post/post.slice';
import communitiesReducer from '_slices/communities/communities.slice';

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
  },
});

export const dispatch = store.dispatch;
export default store;
export type RootState = ReturnType<typeof store.getState>;
