import type {MiddlewareContext} from './types';

export const createMiddlewareContext = (): MiddlewareContext => ({
  searchParams: {},
  json: {},
});
