import type { FC } from 'react';
import rest from '_services/rest/rest';
import { delayIfDev } from '_helpers/dev/delayIfDev';

// ! post slug  shoudl come from the store type, cannot be a string
type CommentsViewProps = {
  postSlug: string;
};

const CommentsView: FC<CommentsViewProps> = ({ postSlug }) => {
  // this is faulty logic.. the post may not have any comments yet
  if (!comments.length) {
    delayIfDev(() => rest.getCommentsByPostSlug(postSlug));
  }

  return (
    <>
      <p>Comments</p>
      <p>{postSlug}</p>
    </>
  );
};

export default CommentsView;
