import type { PostEndpoint_comment_res_body } from '_types/public-api';
import { StoreComment } from './comments.slice.types';

export function expandComment(
  comment: PostEndpoint_comment_res_body
): StoreComment {
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
