import {isFunction} from '@/utils/assertion';

export function getTimestamp() {
  return isFunction(Date.now) ? Date.now() : Date.now();
}
