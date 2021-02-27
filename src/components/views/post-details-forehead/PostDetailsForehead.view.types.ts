import { AsSkeleton } from '_types/material-ui';
import { StorePost } from '_slices/post-repo/posts-repo.slice.types';

export type PostDetailsForeheadViewProps = AsSkeleton &
  Pick<
    StorePost,
    | 'communityUrl'
    | 'communityStylizedUrl'
    | 'createdAt'
    | 'creatorUrl'
    | 'creatorStylizedUrl'
    | 'communityName'
  >;
