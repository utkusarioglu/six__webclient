import { CommentsState } from './comments.slice.types';
import type { StoreComment } from './comments.slice.types';

export const initialState: CommentsState = {
  receivedAt: 0,
  list: [],
};

/**
 * useful for providing skeletons with props
 */
export const emptyComment: StoreComment = {
  id: '',
  parentId: null,
  createdAt: '',
  body: '',
  likeCount: 0,
  dislikeCount: 0,
  voteCount: 0,

  postSlug: '',
  postId: '',

  creatorUsername: '',
  userId: '',

  creatorSlug: '',
  creatorUrl: '',
  creatorStylizedUrl: '',

  state: 'submitted',

  asSkeleton: true,
};
