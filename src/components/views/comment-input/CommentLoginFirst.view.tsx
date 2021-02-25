import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const CommentLoginFirstView = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper elevation={0}>
        <Grid
          container
          className={classes.grid}
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography>You need to login to post comments</Typography>
          </Grid>
          <Grid item>
            <Button
              component={domLinkHelper('/login')}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(),
    },
    grid: {
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing(),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);

export default CommentLoginFirstView;
