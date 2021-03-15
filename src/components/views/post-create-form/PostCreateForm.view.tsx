import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import rest from '_services/rest/rest';
import snacks from '_services/snacks/snacks';
import { selectUser } from '_slices/user/user.slice';
import { selectCommunities } from '_slices/community-repo/community-repo.slice';
import { useSelector } from 'react-redux';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgressWrapper from '_views/circular-progress-wrapper/CircularProgressWrapper.view';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  REDIRECT_TIMEOUT,
  POST_TITLE_MIN_SIZE,
  POST_TITLE_MAX_SIZE,
  POST_BODY_MAX_SIZE,
} from '_config';
import { TabPanelView } from '_views/tab-panel/TabPanel.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

type TabOnChange = (e: ChangeEvent<{}>, newValue: number) => void;

const initialValues = {
  title: '',
  body: '',
  communityId: '',
};

const PostCreateFormView: FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(selectUser);
  const { updatedAt: communitiesUpdatedAt, list: communities } = useSelector(
    selectCommunities
  );

  const [activeTab, setActiveTab] = useState(0);

  if (user.state !== 'logged-in') {
    return <span>Login to create posts</span>;
  }

  const retrieveCommunities = () => delayIfDev(() => rest.getCommunities());

  if (!communitiesUpdatedAt) {
    retrieveCommunities();
  } else if (Date.now() - communitiesUpdatedAt > 10000) {
    retrieveCommunities();
  }

  if (!communitiesUpdatedAt) {
    return <span>Loading communities...</span>;
  }

  if (!!communitiesUpdatedAt && !communities.length) {
    return <span> no communities to post to</span>;
  }

  const { id: userId } = user;

  const tabOnChange: TabOnChange = (_, newValue) => setActiveTab(newValue);

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Tabs
          centered
          className={classes.tabs}
          indicatorColor="primary"
          value={activeTab}
          onChange={tabOnChange}
        >
          <Tab label="Text" />
          <Tab label="Image" />
          <Tab label="Link" />
        </Tabs>

        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          component={domLinkHelper('/')}
          className={classes.closeButton}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </Toolbar>

      <Formik
        initialValues={initialValues}
        validate={({ title, body, communityId }) => {
          const errors: Record<keyof any, string> = {};
          if (!title) {
            errors.title = 'Required';
          }

          if (title.length < POST_TITLE_MIN_SIZE) {
            errors.title = `Title needs at least ${POST_TITLE_MIN_SIZE} characters`;
          }

          if (title.length > POST_TITLE_MAX_SIZE) {
            errors.title = `Title cannot be longer than ${POST_TITLE_MAX_SIZE} characters`;
          }

          if (body.length > POST_BODY_MAX_SIZE) {
            errors.body = `Body cannot be longer than ${POST_BODY_MAX_SIZE} characters`;
          }

          if (communityId === '') {
            errors.communityId = 'You need to select a community for your post';
          }

          return errors;
        }}
        onSubmit={(
          { title, body, communityId },
          { setSubmitting, setErrors }
        ) => {
          console.log('submitting values:', {
            title,
            body,
            communityId,
            userId,
          });
          setSubmitting(true);
          rest
            .createPost({
              title,
              body,
              communityId,
              userId,
              mediaImagePath: '',
            })
            .then((response) => {
              delayIfDev(() => {
                setSubmitting(false);

                if (!response) {
                  snacks.push('postCreateFail');
                  return;
                }

                if (response.state === 'fail') {
                  setErrors(response.errors);
                  snacks.push('postCreateFail');
                  return;
                }

                snacks.push('postCreateSuccess');

                setTimeout(() => {
                  const communitySlug = communities.find(
                    (c) => c.id === communityId
                  )?.communityUrl;
                  const { postSlug } = response.body;
                  history.push(`/${communitySlug}/${postSlug}`);
                }, REDIRECT_TIMEOUT);
              }, 5);
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
        }) => (
          <Container className={classes.root}>
            <form onSubmit={handleSubmit}>
              <FormControl
                variant="filled"
                className={classes.input}
                error={!!(errors.communityId && touched.communityId)}
              >
                <InputLabel>Community</InputLabel>
                <Select
                  name="communityId"
                  onChange={handleChange}
                  value={values.communityId}
                >
                  <ListSubheader>My communities</ListSubheader>
                  {communities
                    .filter((c) => c.ucs)
                    .map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  <ListSubheader>Other communities</ListSubheader>
                  {communities
                    .filter((c) => !c.ucs)
                    .map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors.communityId && touched.communityId && (
                  <FormHelperText
                    error={!!(errors.communityId && touched.communityId)}
                  >
                    {errors.communityId}
                  </FormHelperText>
                )}
              </FormControl>

              <TextField
                name="title"
                variant="filled"
                label="Title"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={!!(errors.title && touched.title)}
                helperText={errors.title && touched.title && errors.title}
              />

              <TabPanelView value={activeTab} index={0}>
                <TextField
                  variant="filled"
                  label="Text (optional)"
                  className={classes.input}
                  name="body"
                  rows={5}
                  rowsMax={8}
                  multiline
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                  error={!!(errors.body && touched.body)}
                  helperText={errors.body && touched.body && errors.body}
                />
              </TabPanelView>

              <TabPanelView value={activeTab} index={1}>
                <span>image upload will be placed here</span>
              </TabPanelView>

              <TabPanelView value={activeTab} index={2}>
                <TextField
                  variant="filled"
                  label="Url"
                  className={classes.input}
                  name="body"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                  error={!!(errors.body && touched.body)}
                  helperText={errors.body && touched.body && errors.body}
                />
              </TabPanelView>

              <CircularProgressWrapper isBusy={isSubmitting}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </CircularProgressWrapper>
            </form>
          </Container>
        )}
      </Formik>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(),
    },
    toolbar: {
      backgroundColor: theme.palette.background.paper,
      minHeight: 'initial',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(2),
    },
    input: {
      minWidth: '100%',
      marginBottom: theme.spacing(),
    },
    tabs: {
      flexGrow: 1,
      // backgroundColor: theme.palette.background.paper,
    },
  })
);

export default PostCreateFormView;
