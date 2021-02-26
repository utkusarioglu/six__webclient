import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SentimentVeryDissatisfiedRounded from '@material-ui/icons/SentimentVeryDissatisfiedRounded';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const NoCommentsYetView = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="center">
        <SentimentVeryDissatisfiedRounded className={classes.icon} />
        <Typography>There are no comments for this post yet</Typography>
        <Typography>You can be the first one to say "First!!1!"</Typography>
      </Grid>
    </Container>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      padding: theme.spacing(3),
      height: 100,
      width: 100,
      color: theme.palette.secondary.light,
    },
  })
);

export default NoCommentsYetView;
