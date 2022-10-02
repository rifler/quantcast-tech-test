/**
 * Use promise-polyfill in case of Promise unavailability in current environment
 * @see rollup.config.ts for more info
 */
import OriginalPromisePonyfill from 'promise-polyfill';

/**
 * Todo add auxiliary checks that Promise function is native
 * use polyfill otherwise
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const PromisePonyfill = typeof Promise === 'function' ? Promise : OriginalPromisePonyfill;
