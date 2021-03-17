import type { FC } from 'react';
import { Formik } from 'formik';
import type { CommunityEp_create_req_body } from '_types/public-api';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '_slices/user/user.slice';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgressWrapper from '_views/circular-progress-wrapper/CircularProgressWrapper.view';
import {
  COMMUNITY_DESCRIPTION_MAX_LEN,
  COMMUNITY_DESCRIPTION_MIN_LEN,
  COMMUNITY_NAME_MAX_LEN,
  COMMUNITY_NAME_MIN_LEN,
  COMMUNITY_SLUG_MAX_LEN,
  COMMUNITY_SLUG_MIN_LEN,
  REDIRECT_TIMEOUT,
} from '_config';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import rest from '_services/rest/rest';
import snacks from '_services/snacks/snacks';

const communityCreateInitialValues: CommunityEp_create_req_body = {
  name: '',
  description: '',
  slug: '',
};

const CommunityCreateFormView: FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(selectUser);

  if (user.state !== 'logged-in') {
    // !TODO create a component for this state
    return <span>You need to be logged in to create a community</span>;
  }

  return (
    <Container className={classes.root}>
      <Formik
        initialValues={communityCreateInitialValues}
        validate={({ name, description, slug }) => {
          const errors: Partial<
            Record<keyof typeof communityCreateInitialValues, string>
          > = {};

          if (!name) {
            errors.name = 'Required';
          }

          if (name.length < COMMUNITY_NAME_MIN_LEN) {
            errors.name = `Community name cannot be shorter than ${COMMUNITY_NAME_MIN_LEN} chars`;
          }

          if (name.length > COMMUNITY_NAME_MAX_LEN) {
            errors.name = `Community name cannot be longer than ${COMMUNITY_NAME_MAX_LEN} chars`;
          }

          if (!description) {
            errors.description = 'Required';
          }

          if (description.length < COMMUNITY_DESCRIPTION_MIN_LEN) {
            errors.description = `Community description cannot be shorter than ${COMMUNITY_DESCRIPTION_MIN_LEN} chars`;
          }

          if (description.length > COMMUNITY_DESCRIPTION_MAX_LEN) {
            errors.description = `Community description cannot be longer than ${COMMUNITY_DESCRIPTION_MAX_LEN} chars`;
          }

          if (!slug) {
            errors.slug = 'Required';
          }

          if (slug.length < COMMUNITY_SLUG_MIN_LEN) {
            errors.slug = `Community slug cannot be shorter than ${COMMUNITY_SLUG_MIN_LEN} chars`;
          }

          if (slug.length > COMMUNITY_SLUG_MAX_LEN) {
            errors.slug = `Community slug cannot be longer than ${COMMUNITY_SLUG_MAX_LEN} chars`;
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          console.log('submitting: ', values);

          setSubmitting(true);
          rest.createCommunity(values).then((response) => {
            delayIfDev(() => {
              setSubmitting(false);

              if (!response) {
                snacks.push('communityCreateFail');
                return;
              }

              if (response.state === 'fail') {
                setErrors(response.errors);
                snacks.push('communityCreateFail');
                return;
              }

              snacks.push('communityCreateSuccess');

              setTimeout(() => {
                history.push(`/r/${response.body.slug}`);
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
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              variant="filled"
              label="Name"
              className={classes.textField}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={!!(errors.name && touched.name)}
              helperText={errors.name && touched.name && errors.name}
            />

            <TextField
              name="slug"
              variant="filled"
              label="Slug"
              className={classes.textField}
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                values.slug || values.name.replace(/\s/g, '-').toLowerCase()
              }
              error={!!(errors.slug && touched.slug)}
              helperText={errors.slug && touched.slug && errors.slug}
            />

            <TextField
              name="description"
              variant="filled"
              label="Description"
              multiline
              rows={5}
              rowsMax={8}
              className={classes.textField}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={!!(errors.description && touched.description)}
              helperText={
                errors.description && touched.description && errors.description
              }
            />

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
        )}
      </Formik>
    </Container>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(),
    },
    textField: {
      minWidth: '100%',
      marginBottom: theme.spacing(),
    },
  })
);

export default CommunityCreateFormView;
