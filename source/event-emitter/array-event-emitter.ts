/**
 * Override `push` and `unshift` methods to receive notifications that array is changed
 */

import {EventEmitter} from '.';

export const arrayEventEmitter = (array: any[]) => {
  const emitter = new EventEmitter();
  const originalPush = array.push;
  const originalUnshift = array.unshift;

  array.push = function (...data: any[]) {
    for (const datum of data) {
      emitter.emit('add', datum);
    }

    return originalPush.apply(this, data);
  };

  array.unshift = function (...data: any[]) {
    for (const datum of data) {
      emitter.emit('add', datum);
    }

    return originalUnshift.apply(this, data);
  };

  /**
     * Override other methods like `splice` if necessary
     */

  return {
    emitter,
    cleanup() {
      array.push = originalPush;
      array.unshift = originalUnshift;
      emitter.destroy();
    },
  };
};
