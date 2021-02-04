import type { FC } from 'react';

// ! post slug  shoudl come from the store type, cannot be a string
type CommentsViewProps = {
  postSlug: string;
};

const CommentsView: FC<CommentsViewProps> = ({ postSlug }) => {
  return (
    <>
      <p>Comments</p>
      <p>{postSlug}</p>
    </>
  );
};

export default CommentsView;
