/**
 * Override `push` and `unshift` methods to receive notifications that array is changed
 */

import {EventEmitter} from './event-emitter';

const emitValues = (emitter: EventEmitter, data: any[]) => {
  for (const datum of data) {
    emitter.emit('add', datum);
  }
};

export const arrayEventEmitter = (array: any[]) => {
  const emitter = new EventEmitter();
  const originalPush = array.push;
  const originalUnshift = array.unshift;

  array.push = function (...data: any[]) {
    emitValues(emitter, data);

    return originalPush.apply(this, data);
  };

  array.unshift = function (...data: any[]) {
    emitValues(emitter, data);

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
