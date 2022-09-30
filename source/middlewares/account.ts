import type {Middleware} from './types';
import {isPixelEvent} from '@/user-events';

export const accountMiddleware: Middleware = (context, userEvent) => {
  if (isPixelEvent(userEvent)) {
    context.searchParams['a'] = `p-${userEvent['account']}`;
  }
};
