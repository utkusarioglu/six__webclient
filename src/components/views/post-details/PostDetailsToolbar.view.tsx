import type { FC } from 'react';
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

const PostDetailsToolbarView: FC<PostDetailsToolbarViewProps> = ({
  asSkeleton,
}) => {
  const classes = useStyles();
  const { postTitle, likeCount, dislikeCount, voteCount } = useSelector(
    selectPost
  );

  const voteFunction = (voteType: number) => alert(`toolbar vote ${voteType}`);

  const HomeDomLink = domLinkHelper('/');

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
            component={HomeDomLink}
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
