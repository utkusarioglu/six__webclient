import { NODE_ENV } from '_base/config';

export function delayIfDev<T>(
  callback: () => T,
  delayMultiplier: number = 1
): void {
  if (NODE_ENV === 'development') {
    setTimeout(() => {
      callback();
    }, delayMultiplier * 1000);
  } else {
    callback();
  }
}
