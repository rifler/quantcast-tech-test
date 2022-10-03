/* eslint-disable unicorn/no-document-cookie */
/**
 * Further can create unified `Storage` interface to be inherited from
 * And encapsulate logic over different storages like cookie/localstorage/indexeddb
 */

import {memoize} from '@/utils/function';

export const getCookie = (incomingName: string) => {
  const cookieArray = document.cookie.split(';');

  for (const cookieString of cookieArray) {
    const [name, value] = cookieString.split('=');

    if (name.trim() === incomingName) {
      return value;
    }
  }
};

const portRegexp = /:\d+$/;

type SetCookieOptions = {
  name: string;
  value: string;
  minutes?: number;
  domain?: string;
  path?: string;
};

export const setCookie = (options: SetCookieOptions) => {
  let cookie = `${options.name}=${encodeURIComponent(options.value)};`;
  if (options.minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (options.minutes * 60 * 1000));
    cookie += `expires=${date.toUTCString()};`;
  }

  if (options.domain) {
    const domainWithoutPort: string = options.domain.replace(portRegexp, '');
    cookie += `domain=${domainWithoutPort};`;
  }

  cookie += `path=${options.path ?? '/'}`;

  try {
    document.cookie = cookie;
  } catch {}
};

type DeleteCookieOptions = {
  name: string;
  domain?: string;
  path?: string;
};

export const deleteCookie = (options: DeleteCookieOptions) => {
  setCookie({
    name: options.name,
    value: '',
    minutes: -100,
    domain: options.domain,
    path: options.path,
  });
};

const checkCookie = (domain?: string, path?: string) => {
  const checkName = '_qntcst_enabled';
  setCookie({
    name: checkName,
    value: '1',
    minutes: 0,
    domain,
    path,
  });

  const hasCookie = getCookie(checkName) === '1';

  if (hasCookie) {
    deleteCookie({
      name: checkName,
      domain,
      path,
    });
  }

  return hasCookie;
};

/**
 * Trying to find the most basic domain, e.g. for sub2.sub1.challenge.local it is challenge.local
 *
 * for sub2.sub1.challenge.com.tr it is challenge.com.tr, not com.tr
 */
const getRootDomain = memoize(() => {
  const parts = (window.location.host || '').split('.');

  if (parts.length === 1) {
    return parts[0];
  }

  return parts.reduce((part, _, index) => {
    let result = part;
    const currentLevel = index + 1;
    if (currentLevel >= 2 && !result) {
      const domain = parts.slice(-currentLevel).join('.');
      if (checkCookie(domain)) {
        result = domain;
      }
    }

    return result;
  }, '');
});

export const createCookieStorage = (prefix = '_qntcst_') => {
  const rootDomain = getRootDomain();
  const fullRootDomain
        = (rootDomain || '').split('.').length === 1
          ? rootDomain
          : `.${rootDomain}`;

  return {
    set(options: SetCookieOptions) {
      setCookie({
        ...options,
        name: `${prefix}${options.name}`,
        domain: options.domain ?? fullRootDomain,
      });
    },
    get(name: string) {
      return getCookie(`${prefix}${name}`);
    },
  };
};

export const cookieStorage = createCookieStorage();
