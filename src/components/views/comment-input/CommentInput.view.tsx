import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import { AsSkeleton } from '_base/@types/material-ui';
import Skeleton from '@material-ui/lab/Skeleton';

// TODO Connect these
type CommentInputViewProps = {
  username: string;
  userUrl: string;
} & AsSkeleton;

const CommentInputView: FC<CommentInputViewProps> = ({
  username,
  userUrl,
  asSkeleton,
}) => {
  const classes = useStyles();

  const UserProfileLink = domLinkHelper(userUrl);

  const [postContent, setPostContent] = useState('');
  const [focused, setFocused] = useState(false);

  const postContentOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostContent(e.target.value);
  };
  const submitOnClick = () => {
    if (postContent.trim().length < 1) return;
    setPostContent('');
  };

  const cancelOnClick = () => {
    setPostContent('');
    setFocused(false);
  };

  const inputOnFocus = () => {
    setFocused(true);
  };

  const inputOnBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setFocused(false);
    }
  };

  return (
    <form className={classes.root} onFocus={inputOnFocus} onBlur={inputOnBlur}>
      <Typography className={classes.commenterAs}>
        {asSkeleton ? (
          <Skeleton />
        ) : (
          <>
            Comment as <Link component={UserProfileLink}>{username}</Link>
          </>
        )}
      </Typography>

      {asSkeleton ? (
        <Skeleton
          height="50px"
          variant="rect"
          className={classes.texFieldSkeleton}
        />
      ) : (
        <TextField
          className={classes.textField}
          label="what are your thoughts?"
          variant="filled"
          rows={focused ? 5 : 1}
          rowsMax={8}
          multiline
          value={postContent}
          onChange={postContentOnChange}
        />
      )}

      {focused && (
        <Box tabIndex={0} className={classes.onFocusBox}>
          <Grid className={classes.hud}>
            <Typography className={classes.hudChars}>
              {postContent.length} chars
            </Typography>
          </Grid>
          <Grid
            container
            spacing={4}
            justify="flex-end"
            className={classes.buttonGrid}
          >
            <Grid item xs={4}>
              <Button
                disableElevation
                onClick={cancelOnClick}
                // color="secondary"
                variant="contained"
                size="large"
                startIcon={<ClearIcon />}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                disableElevation
                onClick={submitOnClick}
                color="primary"
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
              >
                Comment
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </form>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    commenterAs: {
      marginBottom: theme.spacing(1),
    },
    textField: {
      width: '100%',
    },
    onFocusBox: {
      outline: 'none',
      width: '100%',
    },
    hud: {
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.grey[800],
      borderBottomLeftRadius: theme.spacing(1 / 2),
      borderBottomRightRadius: theme.spacing(1 / 2),
    },
    hudChars: {
      textAlign: 'right',
      padding: theme.spacing(1),
    },
    buttonGrid: {
      flexGrow: 1,
    },
    texFieldSkeleton: {
      borderRadius: theme.spacing(1 / 2),
    },
  })
);

export default CommentInputView;
