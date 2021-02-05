import type { AsSkeleton } from '_base/@types/material-ui';
import { RootState } from '_base/store/store';

export type PostCardViewProps = Partial<
  Pick<
    RootState['posts']['list'][0],
    | 'createdAt'
    | 'postUrl'
    | 'postTitle'
    | 'postBody'
    | 'postSlug'
    | 'mediaImagePath'
    | 'commentCount'
    | 'communityUrl'
    | 'communityStylizedUrl'
    | 'creatorUrl'
    | 'creatorStylizedUrl'
  >
> &
  AsSkeleton;
