import type { FC } from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import rest from '_services/rest/rest';
import type { UserSignupPostReq } from 'six__public-api';
import { Overwrite } from 'utility-types';

type SignUpFormViewProps = {};

type SingupFormValues = UserSignupPostReq['req'];

type Errors = Partial<
  Overwrite<SingupFormValues, { [key in keyof SingupFormValues]: string }> & {
    passwordRepeat: string;
  }
>;

const SignUpFormView: FC<SignUpFormViewProps> = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordRepeat: '',
        age: '',
        username: '',
      }}
      validate={(values) => {
        // ! any
        const errors: Errors = {};

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
      onSubmit={(values, { setSubmitting }) => {
        rest.signup(values);
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
                value={values.age}
                error={!!(errors.age && touched.age)}
                helperText={errors.age && touched.age && errors.age}
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

export default SignUpFormView;
