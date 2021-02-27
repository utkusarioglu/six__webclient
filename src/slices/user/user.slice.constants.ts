import { StoreUser } from './user.slice.types';

export const emptyUser = {
  state: 'visitor',
} as StoreUser;

export const initialState: StoreUser = emptyUser;
