import { PostGetRes } from 'six__public-api';

export type PostDetailsProps = Pick<PostGetRes['res'], 'postSlug'>;
