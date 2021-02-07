import type { AsSkeleton } from '_base/@types/material-ui';
import { RootState } from '_base/store/store';

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
