import { PostEndpoint } from 'six__public-api';

type PostGetRes = PostEndpoint['_single']['_v1']['_get']['Res']['Success'];
type PostsGetRes = PostEndpoint['_list']['_v1']['_get']['Res']['Success'];

export interface PostsState {
  updatedAt: number;
  list: PostExpanded[];
}

/**
 * Expands the received post object with properties required by some components
 */
export type PostExpanded = PostGetRes['body'] & {
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

export type UpdatePosts = (posts: PostsGetRes['body']) => void;

export type UpvotePost = (postId: PostsState['list'][0]['postSlug']) => void;
