import type {Middleware} from './types';
import {generateFpa} from '@/utils';

/**
 * Fpa - An random identifier to be used
 * Fpan - 0 = fpa newly created, 1 = fpa existed and is being re-used
 */
export const fpaMiddleware: Middleware = context => {
  context.searchParams['fpa'] = generateFpa();
};
