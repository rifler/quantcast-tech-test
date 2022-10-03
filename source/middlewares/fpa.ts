import type {Middleware} from './types';
import {generateFpa, cookieStorage, memoize} from '@/utils';

const getFpa = memoize(() => {
  const cookieValue = cookieStorage.get('fpa');

  if (cookieValue) {
    return {
      value: cookieValue, // Todo validate value structure
      fpan: '1',
    };
  }

  const newValue = generateFpa();

  cookieStorage.set({
    name: 'fpa',
    value: newValue,
    minutes: 13 * 30 * 24 * 60, // 13 months
  });

  return {
    value: newValue,
    fpan: '0',
  };
});

/**
 * Fpa - An random identifier to be used
 * Fpan - 0 = fpa newly created, 1 = fpa existed and is being re-used
 */
export const fpaMiddleware: Middleware = context => {
  const fpa = getFpa();

  context.searchParams['fpa'] = fpa.value;
  context.searchParams['fpan'] = fpa.fpan;
};
