import { PostGetRes, PostsGetRes } from 'six__public-api';

export interface PostsState {
  updatedAt: number;
  list: PostExpanded[];
}

/**
 * Expands the received post object with properties required by some components
 */
export type PostExpanded = PostGetRes['res'] & {
  receivedAt: number; // epoch
  // used to check whether post can be displayed on screen, useful
  // in some scenarios
  allowView: boolean;

  communityUrl: string;
  communityStylizedUrl: string;
  communitySlug: string;

  postUrl: string;

  creatorUrl: string;
  creatorSlug: string;
  creatorStylizedUrl: string;

  voteCount: number;
};

export type UpdatePosts = (posts: PostsGetRes['res']) => void;

export type UpvotePost = (postId: PostsState['list'][0]['postSlug']) => void;
