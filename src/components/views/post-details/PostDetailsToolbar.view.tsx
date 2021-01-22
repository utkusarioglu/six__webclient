import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import VoteView from '_views/vote/vote.view';
import { darkTheme } from '_base/theme';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

const PostDetailsToolbarView = () => {
  const classes = useStyles();

  const HomeDomLink = domLinkHelper('/');

  return (
    <Toolbar className={classes.root}>
      <VoteView {...{ voteCount: 4 }} />
      <Typography className={classes.title}>Title of the post</Typography>

      <IconButton
        edge="end"
        aria-label="account of current user"
        // aria-controls={menuId}
        aria-haspopup="true"
        color="inherit"
        component={HomeDomLink}
      >
        <CloseIcon color="primary" />
        <Typography color="primary">Close</Typography>
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
