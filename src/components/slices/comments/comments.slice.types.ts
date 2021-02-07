import { CommentsGetRes } from 'six__public-api';
import { AsSkeleton } from '_base/@types/material-ui';

/**
 * Shape of the comment object in the comments store
 */
export type SliceComment = CommentsGetRes['res'][0] &
  AsSkeleton & {
    creatorSlug: string;
    creatorUrl: string; // url
    creatorStylizedUrl: string;
    voteCount: number;
  };

/**
 * Shape of the Comments slice state
 */
export type CommentsState = {
  receivedAt: number; // epoch
  list: SliceComment[];
};
