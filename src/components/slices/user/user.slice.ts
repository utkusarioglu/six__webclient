import { createSlice, Selector } from '@reduxjs/toolkit';
import cookies from '_services/cookies/cookies';
import { SuccessfulUserLoginRes, UserLoginPostRes } from 'six__public-api';
import store, { RootState } from '_base/store/store';

type UserExpanded = SuccessfulUserLoginRes & {
  userSlug: string;
  userUrl: string;
  userStylizedUrl: string;
};

type Visitor = {
  username: string;
  loggedIn: boolean;
};
type UserState = UserExpanded | Visitor;

export const emptyUser: UserState = {
  loggedIn: false,
  username: 'visitor',
};

const initialState: UserState = emptyUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => {
      // TODO there is a better logic implementation here, in which UserExpanded could be only created while loggedIn is true
      // this would remove the need for having username as a property in initial state
      const received: SuccessfulUserLoginRes = action.payload;
      const { username } = received;
      const userSlug = username.toLowerCase();

      const expanded: UserExpanded = {
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

type UpdateUser = (user: UserLoginPostRes['res']) => void;

export const setUser: UpdateUser = (user) => {
  if (user.loggedIn) {
    cookies.setLoggedIn(true);
    store.dispatch(userSlice.actions.setUser(user));
  } else {
    cookies.setLoggedIn(false);
    store.dispatch(userSlice.actions.setUser(emptyUser));
  }
};

type GetLoggedIn = Selector<RootState, UserState['loggedIn']>;
type GetUser = Selector<RootState, UserState>;

export const getLoggedIn: GetLoggedIn = (state) => state.user.loggedIn;

export const getUser: GetUser = (state) => state.user;
