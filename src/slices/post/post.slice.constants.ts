import { PostState } from './post.slice.types';

/**
 * Can be used for skeletons
 */

export const emptyPost: PostState = {
  allowView: false,
  id: '',
  createdAt: '',
  postTitle: '',
  postBody: '',
  postSlug: '',
  likeCount: 0,
  dislikeCount: 0,
  commentCount: 0,
  creatorUsername: '',
  communityName: '',
  communitySlug: '',
  mediaImagePath: '',
  mediaType: 'none',
  receivedAt: 0,
  communityUrl: '',
  communityStylizedUrl: '',
  postUrl: '',
  creatorUrl: '',
  creatorSlug: '',
  creatorStylizedUrl: '',
  voteCount: 0,
};

export const initialState = emptyPost;
