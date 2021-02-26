import type { FC } from 'react';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import { AsSkeleton } from '_types/material-ui';
import Skeleton from '@material-ui/lab/Skeleton';
import rest from '_services/rest/rest';
import { useSelector } from 'react-redux';
import { getUser } from '_slices/user/user.slice';
import { getPost } from '_slices/post/post.slice';
import { pushComment } from '_slices/comments/comments.slice';
import { CommentEndpoint } from 'six__public-api';
import CommentLoginFirstView from './CommentLoginFirst.view';
import { Formik } from 'formik';
import { delayIfDev } from '_helpers/dev/delayIfDev';

// TODO Connect these
type CommentInputViewProps = AsSkeleton;

const CommentInputView: FC<CommentInputViewProps> = ({ asSkeleton }) => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const { id: postId, slug: postSlug } = useSelector(getPost);
  const [commentInputFocused, setCommentInputFocused] = useState(false);

  // if a visitor opens the page, skeleton is skipped
  if (user.state === 'visitor') {
    return <CommentLoginFirstView />;
  }

  const { id: userId, userUrl, username } = user;
  const UserProfileLink = domLinkHelper(userUrl);

  const formOnFocus = () => {
    setCommentInputFocused(true);
  };

  const formOnBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setCommentInputFocused(false);
    }
  };

  const formInitialValues = { commentBody: '' };

  return (
    <Container>
      <Formik
        initialValues={formInitialValues}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.commentBody) {
            errors.body = 'Required';
          } else if (!values.commentBody.length) {
            errors.body = 'You have to type something ma friend';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors, setValues }) => {
          setSubmitting(true);

          const comment: CommentEndpoint['_save']['_v1']['_post']['_req']['Body'] = {
            userId,
            postId,
            parentId: null,
            body: values.commentBody,
          };

          pushComment({
            ...comment,
            id: '',
            createdAt: '',
            likeCount: 1,
            dislikeCount: 0,
            creatorUsername: username,
            postSlug,
          });

          rest.saveComment(comment).then((response) => {
            delayIfDev(() => {
              if (response && response.state === 'fail') {
                setErrors(response.errors);
              } else {
                setValues(formInitialValues);
                setCommentInputFocused(false);
              }

              setSubmitting(false);
            });
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setValues,
        }) => (
          <form
            className={classes.root}
            onBlur={formOnBlur}
            onFocus={formOnFocus}
            onSubmit={handleSubmit}
          >
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
                className={classes.commentBody}
                disabled={isSubmitting}
                label="what are your thoughts?"
                variant="filled"
                rows={commentInputFocused ? 5 : 1}
                rowsMax={8}
                multiline
                name="commentBody"
                value={values.commentBody}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.commentBody}
                helperText={
                  errors.commentBody &&
                  touched.commentBody &&
                  errors.commentBody
                }
              />
            )}

            {commentInputFocused && (
              <Box tabIndex={0} className={classes.onFocusBox}>
                <Grid container className={classes.hud} justify="space-between">
                  <Typography className={classes.hudChars}>
                    {isSubmitting && 'Submitting...'}
                  </Typography>
                  <Typography className={classes.hudChars}>
                    {values.commentBody.length} chars
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
                      onClick={() => {
                        setValues({ ...values, commentBody: '' });
                        setCommentInputFocused(false);
                      }}
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
                      disabled={isSubmitting}
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                      startIcon={<SendIcon />}
                    >
                      Comment
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Container>
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
    commentBody: {
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
