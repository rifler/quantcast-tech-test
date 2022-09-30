import type {Transport} from './types';
import {isFunction} from '@/utils/assertion';

export const beaconTransport: Transport = () => {
  if (!isFunction(navigator.sendBeacon)) {
    return false;
  }

  return async options => new Promise((resolve, reject) => {
    if (options.method !== 'POST') {
      reject();
      return;
    }

    const isQueued = navigator.sendBeacon(options.url);

    if (isQueued) {
      resolve(undefined);
    } else {
      reject();
    }
  });
};
