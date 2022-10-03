import type {Middleware} from './types';
import {memoize} from '@/utils';

const getClosestWindow = memoize(() => {
  let currentWindow = window as Window; // Omit `& typeof globalThis`

  try {
    if (window.parent && window.parent !== currentWindow && window.parent.location) {
      currentWindow = window.parent;
    }
  } catch {}

  return currentWindow;
});

/**
 * Ref - full url of the referrer page
 * url - full url of the current page
 */
export const urlMiddleware: Middleware = context => {
  const closestWindow = getClosestWindow();
  context.searchParams['url'] = closestWindow.location.toString();
  context.searchParams['ref'] = closestWindow.document.referrer;
};
