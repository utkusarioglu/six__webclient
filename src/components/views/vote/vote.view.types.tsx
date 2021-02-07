export type VoteViewProps = PostVote | CommentVote;

type PostVote = VoteFunctions & {
  mode: 'post';
};

type CommentVote = VoteFunctions & {
  mode: 'comment';
};

type VoteFunctions = {
  voteFunction: (voteType: number) => void;
  likeCount: number;
  dislikeCount: number;
  voteCount: number;
};
