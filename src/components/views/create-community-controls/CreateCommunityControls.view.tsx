import Button from '@material-ui/core/Button';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Container from '@material-ui/core/Container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const CreateCommunityControlsView = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Button
        variant="outlined"
        fullWidth
        component={domLinkHelper('/community/create')}
        startIcon={<AddCircleOutlineIcon />}
      >
        Create a community
      </Button>
    </Container>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(),
    },
  })
);

export default CreateCommunityControlsView;
