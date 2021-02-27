import type { FC } from 'react';
import { useEffect } from 'react';
import rest from '_services/rest/rest';
import { useSelector } from 'react-redux';
import { selectComments, clearComments } from '_slices/comments/comments.slice';
import { emptyComment } from '_slices/comments/comments.slice.constants';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommentView from '_views/comment/Comment.view';
import Container from '@material-ui/core/Container';
import CommentInputView from '_views/comment-input/CommentInput.view';
import { getPostId } from '_slices/post/post.slice';
import NoCommentsYetView from './NoCommentsYet.view';

// ! post slug  should come from the store type, cannot be a string
type CommentsViewProps = {};

const CommentsView: FC<CommentsViewProps> = () => {
  const { receivedAt, list: comments } = useSelector(selectComments);
  const postId = useSelector(getPostId);
  /** clears comment list when the user navigates away  */
  useEffect(() => clearComments, []);

  if (!receivedAt && postId !== '') {
    delayIfDev(() => rest.getCommentsByPostId(postId), 2);
  }

  const commentsList = !comments.length ? (
    <NoCommentsYetView />
  ) : (
    <Container>
      {comments.map((comment) => (
        <CommentView {...{ key: comment.id, ...comment }} />
      ))}
    </Container>
  );

  return (
    <>
      <CommentInputView {...{ asSkeleton: !receivedAt }} />
      {!receivedAt ? <CommentSkeletons /> : commentsList}
    </>
  );
};

const CommentSkeletons = () => (
  <Container>
    {Array(3)
      .fill(null)
      .map((_, key) => (
        <CommentView {...{ key, ...emptyComment }} />
      ))}
  </Container>
);

export default CommentsView;
