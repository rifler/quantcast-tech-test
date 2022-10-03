import type {GenericFn} from '@/utils/function';

const throwFunction = (reason: Error) => {
  throw reason;
};

/**
 * Decorate original function to catch errors and
 * In dev mode prints to console
 *
 * @example
 * const unstableFunction = errorLogger('unst.fn', () => { return document.cookie })
 *
 * @example
 * promise.catch(errorLogger('some.scope'))
 */
export const errorLogger = <Fn extends GenericFn<Fn>>(scopeName: string, fn?: Fn): Fn => function (...args) {
  let result;
  try {
    const callFn = fn ?? throwFunction;
    // @ts-expect-error TS2556
    result = callFn(...args);
  } catch (error: unknown) {
    if (MODE === 'development') {
      console.error(`error occured is scope ${scopeName}`);
      console.error(error);
    }

    if (Math.random() < 0.01) {
      // Prepare error and send it to server for further analysis
    }
  }

  return result;
} as Fn;
