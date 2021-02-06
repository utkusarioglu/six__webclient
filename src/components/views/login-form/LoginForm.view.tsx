import type { FC } from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import rest from '_services/rest/rest';

type LoginFormViewProps = {};

const LoginFormView: FC<LoginFormViewProps> = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
      onSubmit={(values, { setSubmitting }) => {
        rest.tryLogin(values);
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
