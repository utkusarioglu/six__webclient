import type { FC } from 'react';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const PostCreateButtonView: FC<{}> = () => {
  const classes = useStyles();

  const PostCreateLink = domLinkHelper('/post/create');

  const imageIconOnClick = () => console.log('image icon');
  const linkIconOnClick = () => console.log('link icon');
  const textAreaOnClick = () => console.log('text area on click');

  return (
    <Container className={classes.root} disableGutters>
      <Grid container className={classes.alignItemsCenter}>
        <Grid className={classes.flexGrow1}>
          <Grid
            container
            className={classes.alignItemsCenter}
            component={PostCreateLink}
            onClick={textAreaOnClick}
          >
            <Avatar className={classes.avatar} />
            <TextField
              variant="outlined"
              label="Create post"
              size="small"
              className={classes.flexGrow1}
            />
          </Grid>
        </Grid>
        <IconButton component={PostCreateLink} onClick={imageIconOnClick}>
          <ImageIcon />
        </IconButton>
        <IconButton component={PostCreateLink} onClick={linkIconOnClick}>
          <LinkIcon />
        </IconButton>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(),
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    avatar: {
      width: 30,
      height: 30,
      margin: theme.spacing(),
    },
    flexGrow1: {
      flexGrow: 1,
    },
  })
);

export default PostCreateButtonView;
