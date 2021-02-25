import { createSlice, Selector } from '@reduxjs/toolkit';
import { SuccessfulUserLoginRes, UserEndpoint } from 'six__public-api';
import store, { RootState } from '_base/store/store';

type UserExpanded = SuccessfulUserLoginRes & {
  userSlug: string;
  userUrl: string;
  userStylizedUrl: string;
};

type Visitor = {
  // username: string;
  loggedIn: boolean;
};

type UserState = UserExpanded | Visitor;

export const emptyUser: UserState = {
  loggedIn: false,
  // username: 'visitor',
};

const initialState: UserState = emptyUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => {
      //  TODO there is a better logic implementation here, in which UserExpanded could be only created while loggedIn is true
      //  this would remove the need for having username as a property in initial
      const received: SuccessfulUserLoginRes = action.payload;
      if (!received.loggedIn) {
        return emptyUser;
      }

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

type SetUser = (
  user: UserEndpoint['Login']['v1']['Post']['Res']['Success']['body']
) => void;
type GetLoggedIn = Selector<RootState, UserState['loggedIn']>;
type GetUser = Selector<RootState, UserState>;

export const setUser: SetUser = (user) => {
  if (user.loggedIn) {
    store.dispatch(userSlice.actions.setUser(user));
  } else {
    store.dispatch(userSlice.actions.setUser(emptyUser));
  }
};

export const getLoggedIn: GetLoggedIn = (state) => state.user.loggedIn;

export const getUser: GetUser = (state) => state.user;
