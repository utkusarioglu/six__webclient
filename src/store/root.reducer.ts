import { combineReducers } from 'redux';
import RootReducer from './store.types';
import postsReducer from '_features/posts/Posts.reducer';

export const rootReducer = combineReducers<RootReducer>({
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
