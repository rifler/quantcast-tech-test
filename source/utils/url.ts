import {isNil} from '@/utils/assertion';
import {entries} from '@/utils/object';

// Todo memo
const getUrlParser = () => document.createElement('a');

export const parseUrl = (url: string) => {
  const parser = getUrlParser();
  parser.href = url;
  const search = parser.search.replace(/^\?/, '');
  const pathname = parser.pathname || '/';
  return {
    protocol: parser.protocol,
    host: parser.host,
    port: parser.port,
    hostname: parser.hostname,
    hash: parser.hash.replace(/^#/, ''),
    search,
    searchParams: search.split('&').reduce<Record<string, string>>((acc, searchPart) => {
      const [rawName, rawValue] = searchPart.split('=');
      if (rawName && rawValue) {
        const name = decodeURIComponent(rawName);
        acc[name] = decodeURIComponent(rawValue);
      }

      return acc;
    }, {}),
    pathname,
    path: pathname + parser.search,
    href: parser.href,
  };
};

const urlAttributes = ['hash', 'host', 'hostname', 'port', 'protocol', 'pathname'] as const;
export const serializeUrl = (parsedUrl: ReturnType<typeof parseUrl>) => {
  const parser = getUrlParser();
  parser.href = '/';

  for (const urlAttribute of urlAttributes) {
    const value = parsedUrl[urlAttribute];
    if (value) {
      parser[urlAttribute] = parsedUrl[urlAttribute];
    }
  }

  const search = [];
  if (parsedUrl.searchParams) {
    for (const [key, value] of entries(parsedUrl.searchParams)) {
      if (key && !isNil(value) && value !== '') {
        search.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  parser.search = search.join('&');

  return parser.href;
};
