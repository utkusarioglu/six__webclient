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
  receivedAt: 0,
  allowView: false,
  ucs: false,
};

export const initialState = emptyCommunity;
