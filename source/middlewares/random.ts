import type {Middleware} from './types';
import {generateRandomInteger} from '@/utils';

/**
 * A 9 digit random number
 */
export const randomMiddleware: Middleware = context => {
  context.searchParams['r'] = generateRandomInteger(100_000_000, 999_999_999);
};
