import { StoreComment, Comment } from './comments.slice.types';

export function expandComment(comment: Comment): StoreComment {
  const { creatorUsername, likeCount, dislikeCount } = comment;
  const creatorSlug = creatorUsername.toLowerCase();

  return {
    ...comment,
    creatorSlug,
    creatorStylizedUrl: `u/${creatorUsername}`,
    creatorUrl: `u/${creatorSlug}`,
    asSkeleton: false,
    voteCount: likeCount - dislikeCount,
  };
}
