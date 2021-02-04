import { PostGetRes } from 'six__public-api';

export type VoteViewProps = Pick<PostGetRes['res'], 'postSlug'>;
