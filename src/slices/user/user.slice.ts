import type { UserSessionRes } from '_types/public-api';
import { createSlice, Selector } from '@reduxjs/toolkit';
import store, { RootState } from '_store/store';

export type UserExpanded = UserSessionRes & {
  userSlug: string;
  userUrl: string;
  userStylizedUrl: string;
};

type Visitor = {
  state: 'visitor';
};

type UserState = UserExpanded | Visitor;

export const emptyUser: UserState = {
  state: 'visitor',
} as UserState;

const initialState: UserState = emptyUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => {
      //  TODO there is a better logic implementation here, in which UserExpanded could be only created while loggedIn is true
      //  this would remove the need for having username as a property in initial
      const received: UserSessionRes = action.payload;

      if (received.state === 'visitor') {
        return emptyUser;
      }

      const { username } = received;
      const userSlug = username.toLowerCase();

      const expanded: UserState = {
        ...received,
        userSlug,
        userUrl: `u/${userSlug}`,
        userStylizedUrl: `u/${username}`,
      };

      return expanded;
    },
  },
});

export default userSlice.reducer;

type SetUser = (user: UserSessionRes) => void;
type GetLoggedIn = Selector<RootState, boolean>;
type GetUser = Selector<RootState, UserState>;

export const setUser: SetUser = (user) => {
  if (user.state === 'logged-in') {
    store.dispatch(userSlice.actions.setUser(user));
  } else {
    store.dispatch(userSlice.actions.setUser(emptyUser));
  }
};

export const getLoggedIn: GetLoggedIn = (state) =>
  state.user.state === 'logged-in';

export const getUser: GetUser = (state) => state.user;
