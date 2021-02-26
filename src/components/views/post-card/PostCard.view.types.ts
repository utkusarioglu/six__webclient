import type { AsSkeleton } from '_types/material-ui';
import { RootState } from '_store/store';

export type PostCardViewProps = Pick<
  RootState['postRepo']['list'][0],
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
