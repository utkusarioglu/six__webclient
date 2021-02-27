import type { AsSkeleton } from '_types/material-ui';
import type { PostState } from '_slices/post/post.slice.types';

export type PostCardViewProps = Pick<
  PostState,
  | 'createdAt'
  | 'postUrl'
  | 'postTitle'
  | 'postBody'
  | 'mediaImagePath'
  | 'commentCount'
  | 'communityUrl'
  | 'communityStylizedUrl'
  | 'creatorUrl'
  | 'creatorStylizedUrl'
  | 'communityName'
  | 'likeCount'
  | 'dislikeCount'
  | 'voteCount'
> &
  AsSkeleton;
