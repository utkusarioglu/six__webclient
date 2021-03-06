import type { FC } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import rest from '_services/rest/rest';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { SignUpFormViewProps } from './SignUpForm.view.types';
import snacks from '_services/snacks/snacks';
import CircularProgressWrapper from '_views/circular-progress-wrapper/CircularProgressWrapper.view';
import { REDIRECT_TIMEOUT } from '_config';

const SignupInitialValues = {
  email: '',
  password: '',
  passwordRepeat: '',
  age: 0,
  username: '',
};

const SignUpFormView: FC<SignUpFormViewProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  snacks.remove('loginPrompt');

  return (
    <>
      <Container className={classes.formContainer}>
        <Formik
          initialValues={SignupInitialValues}
          validate={(values) => {
            const errors: Partial<
              Record<keyof typeof SignupInitialValues, string>
            > = {};

            if (!values.username) {
              errors.username = 'Required';
            }

            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (values.password !== values.passwordRepeat) {
              const passwordNoMatchMessage = "password fields don't match";

              errors.password = passwordNoMatchMessage;
              errors.passwordRepeat = passwordNoMatchMessage;
            }

            if (!values.age) {
              errors.age = 'Required';
            }

            return errors;
          }}
          onSubmit={(
            { username, age, email, password },
            { setSubmitting, setErrors }
          ) => {
            rest.signup({ username, age, email, password }).then((response) => {
              delayIfDev(() => {
                setSubmitting(false);

                if (!response) {
                  snacks.push('restGeneralError');
                  return;
                }

                if (response.state === 'fail') {
                  snacks.push('restGeneralError');
                  setErrors(response.errors);
                  return;
                }

                snacks.push('accountCreated');
                setTimeout(() => {
                  history.push('/communities');
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
            <form onSubmit={handleSubmit} className={classes.root}>
              <Grid container direction="column">
                <TextField
                  className={classes.input}
                  label="Username"
                  variant="filled"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={!!(errors.username && touched.username)}
                  helperText={
                    errors.username && touched.username && errors.username
                  }
                />
                <TextField
                  className={classes.input}
                  label="email"
                  variant="filled"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!(errors.email && touched.email)}
                  helperText={errors.email && touched.email && errors.email}
                />
                <TextField
                  className={classes.input}
                  label="password"
                  variant="filled"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={!!(errors.password && touched.password)}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <TextField
                  className={classes.input}
                  label="repeat password"
                  variant="filled"
                  type="password"
                  name="passwordRepeat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordRepeat}
                  error={!!(errors.passwordRepeat && touched.passwordRepeat)}
                  helperText={
                    errors.passwordRepeat &&
                    touched.passwordRepeat &&
                    errors.passwordRepeat
                  }
                />
                <TextField
                  className={classes.input}
                  label="Age"
                  variant="filled"
                  type="number"
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age || ''}
                  error={!!(errors.age && touched.age)}
                  helperText={errors.age && touched.age && errors.age}
                />

                <CircularProgressWrapper isBusy={isSubmitting}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </CircularProgressWrapper>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>

      <Container>
        <Typography>
          Are you looking for{' '}
          <Link component={domLinkHelper('/login')}>login</Link>?
        </Typography>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    input: {
      marginBottom: theme.spacing(1),
    },
    formContainer: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
  })
);

export default SignUpFormView;
