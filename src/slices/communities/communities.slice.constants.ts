import { CommunitiesSlice, StoreCommunity } from './communities.slice.types';

export const initialState: CommunitiesSlice = {
  updatedAt: 0,
  list: [],
};

export const emptyCommunity: StoreCommunity = {
  id: '',
  createdAt: '',
  description: '',
  name: '',
  slug: '',
  postCount: 0,
  subscriberCount: 0,
};
