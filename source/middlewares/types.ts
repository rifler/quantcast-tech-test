export type MiddlewareContext = {
  searchParams: Record<string, string | number | undefined>;
  json: Record<string, any>;
};

export type Middleware = (context: MiddlewareContext, userEvent?: unknown) => void | Promise<void>;
