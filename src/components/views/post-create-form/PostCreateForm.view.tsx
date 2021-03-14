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
import { createStyles, makeStyles } from '@material-ui/core/styles';

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

  const tabOnChange: (e: ChangeEvent<{}>, newValue: number) => void = (
    e,
    newValue
  ) => {
    // const value = e.target.value as string;
    setActiveTab(newValue);
  };

  return (
    <>
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

      <Formik
        initialValues={{
          title: 'This is the most amazing post title',
          body: 'This is the most amazing post body',
          communityId: communities[0].id,
        }}
        validate={({ title, body, communityId }) => {
          const errors: Record<keyof any, string> = {};
          if (!title) {
            errors.title = 'Required';
          }

          if (title.length < 10) {
            errors.title = 'Title needs to be longer than 10 characters';
          }

          if (!body) {
            errors.body = 'Required';
          }

          if (body.length < 10) {
            errors.body = 'Body needs to be longer than 10 characters';
          }

          if (communityId === '') {
            errors.communityId = 'You need to select a community to post to';
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
                }, 1000);
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
        }) => (
          <Container className={classes.root}>
            <form onSubmit={handleSubmit}>
              <TextField
                name="title"
                variant="filled"
                label="Post title"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={!!(errors.title && touched.title)}
                helperText={errors.title && touched.title && errors.title}
              />

              <TextField
                variant="filled"
                label="Post body"
                className={classes.input}
                name="body"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                error={!!(errors.body && touched.body)}
                helperText={errors.body && touched.body && errors.body}
              />

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
                  {communities.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  error={!!(errors.communityId && touched.communityId)}
                >
                  {errors.communityId &&
                    touched.communityId &&
                    errors.communityId}
                </FormHelperText>
              </FormControl>

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
    input: {
      minWidth: '100%',
      marginBottom: theme.spacing(),
    },
    tabs: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default PostCreateFormView;
