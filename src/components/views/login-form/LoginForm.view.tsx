import type { FC } from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import rest from '_services/rest/rest';
import { useSelector } from 'react-redux';
import { selectUser } from '_slices/user/user.slice';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Link from '@material-ui/core/Link';
import snacks from '_services/snacks/snacks';
import { REDIRECT_TIMEOUT } from '_config';
import CircularProgressWrapper from '_views/circular-progress-wrapper/CircularProgressWrapper.view';

type LoginFormViewProps = {};

const LoginFormView: FC<LoginFormViewProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(selectUser);

  snacks.remove('loginPrompt');

  if (user.state === 'logged-in') {
    snacks.push('loggedIn');
    setTimeout(() => history.push('/'), REDIRECT_TIMEOUT);
  }

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: true }}
        validate={(values) => {
          // !any
          const errors: any = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          rest.login(values).then((response) => {
            delayIfDev(() => {
              setSubmitting(false);

              if (!response) {
                snacks.push('restGeneralError');
                return;
              }

              if (response.state === 'fail') {
                // TODO this is not exhaustive
                if (response.errors.general === 'AUTH_FAILURE') {
                  snacks.push('loginWrongUsernamePass');
                } else {
                  snacks.push('restGeneralError');
                }
                setErrors(response.errors);
                return;
              }
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
            <Container>
              <Grid container direction="column">
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

                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color="primary"
                    />
                  }
                  label="Remember me"
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
            </Container>
          </form>
        )}
      </Formik>

      <Container>
        <Typography>
          Are you looking for{' '}
          <Link component={domLinkHelper('/signup')}>sign up</Link>?
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
  })
);

export default LoginFormView;
