import type { PostState } from '_slices/post/post.slice.types';

export type PostDetailsProps = Pick<PostState, 'postSlug'>;
