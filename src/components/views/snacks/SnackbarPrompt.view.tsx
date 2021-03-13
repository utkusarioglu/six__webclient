import { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { makeStyles } from '@material-ui/core/styles';
import { SnackPromptViewProps } from './SnackbarPrompt.view.types';

const SnackbarPromptView: FC<SnackPromptViewProps> = ({
  open,
  onExit,
  currentSnack,
  setNext,
  setOpen,
  incrementSnackCursor,
}) => {
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onExited={onExit}
      message={currentSnack.message}
      action={
        <>
          {currentSnack.actions.map(
            ({ color, onClick, text, variant, href, next }) => (
              <Button
                className={classes.actionButton}
                component={href ? domLinkHelper(href) : 'button'}
                color={color}
                size="small"
                variant={variant}
                onClick={() => {
                  if (next) {
                    setNext(next);
                    setOpen(false);
                  } else {
                    incrementSnackCursor();
                  }

                  if (href) {
                    setOpen(false);
                  }

                  setOpen(false);
                  onClick && onClick();
                }}
              >
                {text}
              </Button>
            )
          )}
        </>
      }
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: theme.spacing(),
  },
  actionButton: {
    marginLeft: theme.spacing(),
    whiteSpace: 'nowrap',
  },
}));

export default SnackbarPromptView;
