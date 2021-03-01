import type { SnackMessage } from '_slices/snack-keys/snack-keys.slice.types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSnackKeys } from '_slices/snack-keys/snack-keys.slice';
import snacks from '_services/snacks/snacks';
import SnackbarAlertView from './SnackbarAlert.view';
import SnackbarPromptView from './SnackbarPrompt.view';

function SnacksView() {
  const snackKeys = useSelector(selectSnackKeys);

  const [open, setOpen] = useState(false);
  const [snackCursor, setSnackCursor] = useState<number>(-1);
  const [currentSnack, setCurrentSnack] = useState<SnackMessage | undefined>();
  const [nextKey, setNextKey] = useState<string | undefined>();

  const incrementSnackCursor = () => setSnackCursor((c) => ++c);

  useEffect(() => {
    if (!snackKeys.length) {
      setOpen(false);
      setSnackCursor(-1);
    } else if (!!snackKeys.length && snackCursor === -1) {
      setSnackCursor(0);
    } else if (snackKeys.length <= snackCursor) {
      setOpen(false);
      snacks.clear();
    } else {
      const snack = snacks.getSnackForKey(snackKeys[snackCursor]);
      if (snack) {
        setCurrentSnack(snack);
        setOpen(true);
      }
    }
  }, [snackCursor, snackKeys]);

  const onExit = () => {
    const moveToNextCursor = () => {
      incrementSnackCursor();
      setCurrentSnack(undefined);
    };

    if (nextKey) {
      setNextKey(undefined);
      const snack = snacks.getSnackForKey(nextKey);

      if (snack) {
        setCurrentSnack(snack);
        setOpen(true);
      } else {
        moveToNextCursor();
      }
    } else {
      moveToNextCursor();
    }
  };

  return (
    <div>
      {currentSnack &&
        (currentSnack.alert === 'none' ? (
          <SnackbarPromptView
            {...{
              open,
              onExit,
              currentSnack,
              setNext: setNextKey,
              setOpen,
              incrementSnackCursor,
            }}
          />
        ) : (
          <SnackbarAlertView {...{ open, currentSnack, onExit, setOpen }} />
        ))}
    </div>
  );
}

export default SnacksView;
