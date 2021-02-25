import type { FC } from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import rest from '_services/rest/rest';
import { useSelector } from 'react-redux';
import { getUser } from '_slices/user/user.slice';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { delayIfDev } from '_base/components/helpers/dev/delayIfDev';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Link from '@material-ui/core/Link';

type LoginFormViewProps = {};

const LoginFormView: FC<LoginFormViewProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(getUser);

  if (user.state === 'logged-in') {
    setTimeout(() => history.push('/'), 1000);
  }

  return (
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
            console.log(response);
            if (response && response.state === 'fail') {
              setErrors(response.errors);
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
      }) => (
        <>
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Container>
          </form>
          <Container>
            {user.state === 'logged-in' && <Typography>Success!</Typography>}

            <Typography>
              Are you looking for{' '}
              <Link component={domLinkHelper('/signup')}>sign up</Link>?
            </Typography>
          </Container>
        </>
      )}
    </Formik>
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
