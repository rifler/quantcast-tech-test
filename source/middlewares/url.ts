import type {Middleware} from './types';

// Todo memoize
const getClosestWindow = () => {
  let currentWindow = window as Window; // Omit `& typeof globalThis`

  try {
    if (window.top && window.top !== currentWindow) {
      currentWindow = window.top;
    }
  } catch {}

  return currentWindow;
};

/**
 * Ref - full url of the referrer page
 * url - full url of the current page
 */
export const urlMiddleware: Middleware = context => {
  const closestWindow = getClosestWindow();
  context.searchParams['url'] = closestWindow.location.toString();
  context.searchParams['ref'] = closestWindow.document.referrer;
};
