import { NODE_ENV } from '_base/config';

export function delayIfDev<T>(callback: () => T, delay: number = 2000): void {
  if (NODE_ENV === 'development') {
    setTimeout(() => {
      console.log('callback');
      callback();
    }, delay);
  } else {
    callback();
  }
}
