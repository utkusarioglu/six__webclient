import { snackRecord } from '_services/snacks/snacks.constants';
import {
  clearSnackKeys,
  pushSnackKey,
  removeSnackKey,
} from '_slices/snack-keys/snack-keys.slice';

const snacks = {
  push: (snackKey: keyof typeof snackRecord) => pushSnackKey(snackKey),

  remove: (snackKey: keyof typeof snackRecord) => removeSnackKey(snackKey),

  clear: () => clearSnackKeys(),

  getSnackForKey: (snackKey: keyof typeof snackRecord) => {
    const snack = snackRecord[snackKey];
    if (!snack) {
      // TODO this needs to be connected to monitoring
      console.error(`No snack record named: ${snackKey}`);
      return null;
    }
    return snack;
  },
};

export default snacks;
