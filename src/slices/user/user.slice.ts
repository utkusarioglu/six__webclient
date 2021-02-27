import type { UserSessionRes } from '_types/public-api';
import { createSlice } from '@reduxjs/toolkit';
import store from '_store/store';
import { SetUser, GetLoggedIn, GetUser } from './user.slice.types';
import { initialState } from './user.slice.constants';
import { expandUser } from './user.slice.logic';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => {
      //  TODO there is a better logic implementation here, in which UserExpanded could be only created while loggedIn is true
      //  this would remove the need for having username as a property in initial
      const received: UserSessionRes = action.payload;

      const expanded = expandUser(received);

      return expanded;
    },
  },
});

export default userSlice.reducer;

export const setUser: SetUser = (user) =>
  store.dispatch(userSlice.actions.setUser(user));

export const getLoggedIn: GetLoggedIn = (state) =>
  state.user.state === 'logged-in';

export const getUser: GetUser = (state) => state.user;
