import type {Middleware} from './types';
import {isPixelEvent} from '@/user-events';

export const labelsMiddleware: Middleware = (context, userEvent) => {
  if (isPixelEvent(userEvent)) {
    context.searchParams['labels'] = userEvent['labels'];
  }
};
