import type { PostEndpoint } from 'six__public-api';
import { AsSkeleton } from '_types/material-ui';

export type Comment = PostEndpoint['_comments']['_v1']['_get']['_res']['Success']['body'][0];

/**
 * Shape of the comment object in the comments store
 */
export type SliceComment = Comment &
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
