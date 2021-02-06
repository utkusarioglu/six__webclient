import type { FC } from 'react';
import { useEffect } from 'react';
import rest from '_services/rest/rest';
import { useSelector } from 'react-redux';
import {
  getComments,
  clearComments,
  emptyComment,
} from '_slices/comments/comments.slice';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import CommentView from '_views/comment/Comment.view';
import Container from '@material-ui/core/Container';
import CommentInputView from '_views/comment-input/CommentInput.view';
import { Typography } from '@material-ui/core';

// ! post slug  should come from the store type, cannot be a string
type CommentsViewProps = {
  postSlug: string;
};

const CommentsView: FC<CommentsViewProps> = ({ postSlug }) => {
  const { receivedAt, list: comments } = useSelector(getComments);

  /** clears comment list when the user navigates away  */
  useEffect(() => clearComments, []);

  // this is faulty logic.. the post may not have any comments yet
  if (!receivedAt) {
    delayIfDev(() => rest.getCommentsByPostSlug(postSlug), 4000);
  }

  if (receivedAt && !comments.length) {
    return (
      <Container>
        <Typography>
          Looks like there are no comments for this post yet.
        </Typography>
        <Typography>You can be the first one to say "First!!1!"</Typography>
      </Container>
    );
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
      {!!receivedAt
        ? comments.map((comment) => <CommentView {...comment} />)
        : Array(3)
            .fill(null)
            .map((_) => <CommentView {...emptyComment} />)}
    </Container>
  );
};

export default CommentsView;
