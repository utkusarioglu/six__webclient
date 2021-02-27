import type { UserSessionRes } from '_types/public-api';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { SetUser, SelectLoggedIn, SelectUser } from './user.slice.types';
import { initialState } from './user.slice.constants';
import { expandUser } from './user.slice.logic';

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => {
      const received: UserSessionRes = action.payload;

      const expanded = expandUser(received);

      return expanded;
    },
  },
});

export default reducer;

export const setUser: SetUser = (user) => dispatch(actions.setUser(user));

export const selectLoggedIn: SelectLoggedIn = (state) =>
  state.user.state === 'logged-in';

export const selectUser: SelectUser = (state) => state.user;
