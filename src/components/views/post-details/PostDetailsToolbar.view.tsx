import type { FC } from 'react';
import type { PostGetRes } from 'six__public-api';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import VoteView from '_views/vote/vote.view';
import { darkTheme } from '_base/theme';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { getPostTitle } from '_slices/posts/posts.slice';
import { useSelector } from 'react-redux';

type PostDetailsToolbarViewProps = Pick<PostGetRes['res'], 'postSlug'>;

const PostDetailsToolbarView: FC<PostDetailsToolbarViewProps> = ({
  postSlug,
}) => {
  const classes = useStyles();
  const postTitle = useSelector(getPostTitle(postSlug));

  const HomeDomLink = domLinkHelper('/');

  return (
    <Toolbar className={classes.root}>
      <VoteView {...{ postSlug }} />
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
    </Toolbar>
  );
};

const useStyles = makeStyles({
  root: {
    backgroundColor: darkTheme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
});

export default PostDetailsToolbarView;
