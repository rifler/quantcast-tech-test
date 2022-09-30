import {isUndefined} from '@/utils/assertion';

export const rndMax = Number.MAX_SAFE_INTEGER;
export const rndMin = 1;

export function generateRandomInteger(rawMin: number, rawMax: number) {
  let min: number;
  let max: number;
  const isMaxUndef = typeof rawMax === 'undefined';

  if (isUndefined(rawMin) && isMaxUndef) {
    min = rndMin;
    max = rndMax;
  } else if (isMaxUndef) {
    min = 1;
    max = rawMin;
  } else {
    min = rawMin;
    max = rawMax!;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}
