import type {Middleware} from '@/middlewares';
import {createMiddlewareContext} from '@/middlewares';
import type {Transport, TransportOptions} from '@/transports';
import {parseUrl, serializeUrl} from '@/utils';

type SenderOptions = {
  prefixUrl: string;
  transports: Array<ReturnType<Transport>>;
  middlewares: Middleware[];
} & Partial<Pick<TransportOptions, 'method' | 'timeout'>>;

export const createSender = (options: SenderOptions) => async (userEvent: unknown) => {
  const parsedUrl = parseUrl(options.prefixUrl);
  const newContext = createMiddlewareContext();
  const middlewareMaybePromises = [];
  for (const middleware of options.middlewares) {
    middlewareMaybePromises.push(middleware(newContext, userEvent));
  }

  await Promise.allSettled(middlewareMaybePromises);

  Object.assign(parsedUrl.searchParams, newContext.searchParams);
  const serializedUrl = serializeUrl(parsedUrl);

  for (const transport of options.transports) {
    if (transport) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await transport({
          url: serializedUrl,
          method: options.method ?? 'GET',
          timeout: options.timeout,
        });
        break;
      } catch {}
    }
  }
};
