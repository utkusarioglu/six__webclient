import { CommunitiesStore, ExpandedCommunity } from './communities.slice.types';

export const initialState: CommunitiesStore = {
  updatedAt: 0,
  list: [],
};

export const emptyCommunity: ExpandedCommunity = {
  id: '',
  createdAt: '',
  description: '',
  name: '',
  slug: '',
  postCount: 0,
  subscriberCount: 0,
};
