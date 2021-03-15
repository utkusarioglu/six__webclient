import type { FC } from 'react';
import { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import VoteView from '_views/vote/vote.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { selectPost } from '_slices/post/post.slice';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { PostDetailsToolbarViewProps } from './PostDetailsToolbar.view.types';
import { votePost } from '_views/vote/vote.logic';
import { selectUser } from '_slices/user/user.slice';

const PostDetailsToolbarView: FC<PostDetailsToolbarViewProps> = ({
  asSkeleton,
}) => {
  const classes = useStyles();
  const {
    id,
    postTitle,
    likeCount,
    dislikeCount,
    voteCount,
    userVote,
  } = useSelector(selectPost);
  const user = useSelector(selectUser);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const voteFunction = votePost(user, setIsSubmittingVote, id);

  return (
    <Toolbar className={classes.root}>
      {asSkeleton ? (
        <Skeleton variant="rect" />
      ) : (
        <>
          <VoteView
            {...{
              mode: 'post',
              likeCount,
              dislikeCount,
              voteCount,
              voteFunction,
              userVote,
              isSubmitting: isSubmittingVote,
            }}
          />
          <Typography className={classes.title} noWrap={true}>
            {postTitle}
          </Typography>

          <IconButton
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            component={domLinkHelper('/')}
          >
            <CloseIcon color="primary" />
          </IconButton>
        </>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default PostDetailsToolbarView;
