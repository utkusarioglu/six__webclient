import type { AsSkeleton } from '_types/material-ui';
import type { PostState } from '_slices/post/post.slice.types';

export type PostCardComfyViewProps = Pick<
  PostState,
  | 'id'
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
  | 'userVote'
> &
  AsSkeleton;
