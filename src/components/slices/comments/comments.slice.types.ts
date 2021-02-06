import { CommentsGetRes } from 'six__public-api';

/**
 * Shape of the comment object in the comments store
 */
export type SliceComment = CommentsGetRes['res'][0] & {
  creatorSlug: string;
  creatorUrl: string; // url
  creatorStylizedUrl: string;
};

/**
 * Shape of the Comments slice state
 */
export interface CommentsState {
  list: SliceComment[];
}
