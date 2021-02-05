import type { FC } from 'react';
import rest from '_services/rest/rest';

// ! post slug  shoudl come from the store type, cannot be a string
type CommentsViewProps = {
  postSlug: string;
};

const CommentsView: FC<CommentsViewProps> = ({ postSlug }) => {
  rest.getCommentsByPostSlug(postSlug);

  return (
    <>
      <p>Comments</p>
      <p>{postSlug}</p>
    </>
  );
};

export default CommentsView;
