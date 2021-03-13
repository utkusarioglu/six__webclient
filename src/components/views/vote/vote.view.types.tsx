import { VoteTypes } from '_types/public-api';

export type VoteViewProps = PostVote | CommentVote;

type PostVote = VoteFunctions & {
  mode: 'post';
};

type CommentVote = VoteFunctions & {
  mode: 'comment';
};

type VoteFunctions = {
  voteFunction: (voteType: 1 | -1) => void;
  likeCount: number;
  dislikeCount: number;
  voteCount: number;
  userVote: VoteTypes;
  isSubmitting: boolean;
};
