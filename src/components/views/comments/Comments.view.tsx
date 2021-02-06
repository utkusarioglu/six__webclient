import type { FC } from 'react';
import rest from '_services/rest/rest';
import { useSelector } from 'react-redux';
import { getCommentsByPostSlug } from '_slices/comments/comments.slice';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommentView from '_views/comment/Comment.view';
import Container from '@material-ui/core/Container';
import CommentInputView from '_views/comment-input/CommentInput.view';

// ! post slug  should come from the store type, cannot be a string
type CommentsViewProps = {
  postSlug: string;
};

const CommentsView: FC<CommentsViewProps> = ({ postSlug }) => {
  const comments = useSelector(getCommentsByPostSlug(postSlug));

  // this is faulty logic.. the post may not have any comments yet
  if (!comments.length) {
    delayIfDev(() => rest.getCommentsByPostSlug(postSlug), 4000);
  }

  return (
    <Container>
      <CommentInputView
        {...{
          username: 'utkuSarioglu',
          userUrl: 'u/utkusarioglu',
          asSkeleton: !comments.length,
        }}
      />
      {comments && comments.map((comment) => <CommentView {...comment} />)}
    </Container>
  );
};

export default CommentsView;
