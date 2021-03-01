import { CommunityState } from './community.slice.types';

/**
 * Can be used for skeletons
 */

export const emptyCommunity: CommunityState = {
  id: '',
  slug: '',
  createdAt: '',
  description: '',
  name: '',
  postCount: 0,
  subscriberCount: 0,
  communityUrl: '',
};

export const initialState = emptyCommunity;
