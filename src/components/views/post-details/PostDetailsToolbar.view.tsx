import type { FC } from 'react';
import type { PostEndpoint } from 'six__public-api';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import VoteView from '_views/vote/vote.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { getPost } from '_slices/post/post.slice';
import { useSelector } from 'react-redux';
import { AsSkeleton } from '_types/material-ui';
import Skeleton from '@material-ui/lab/Skeleton';

type PostDetailsToolbarViewProps = AsSkeleton &
  Pick<
    PostEndpoint['_single']['_v1']['_get']['_res']['Success']['body'],
    'postSlug'
  >;

const PostDetailsToolbarView: FC<PostDetailsToolbarViewProps> = ({
  asSkeleton,
  postSlug,
}) => {
  const classes = useStyles();
  const { postTitle, likeCount, dislikeCount, voteCount } = useSelector(
    getPost
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
