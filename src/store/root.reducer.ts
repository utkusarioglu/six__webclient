import { combineReducers } from 'redux';
import RootReducer from './store.types';

export const rootReducer = combineReducers<RootReducer>({
});

export type RootState = ReturnType<typeof rootReducer>;
