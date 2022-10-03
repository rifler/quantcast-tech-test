export const noop = () => undefined;

type AnyFunc = (...args: any[]) => any;

const firstArg = <T>(a: T): T => a;

export const memoize = <Fn extends AnyFunc>(fn: Fn, getKey?: (...arg: Parameters<Fn>) => string): Fn => {
  const memo: Record<string, ReturnType<Fn>> = {};
  type GetKey = Exclude<typeof getKey, undefined>;
  const keyFn: GetKey = getKey ?? firstArg as unknown as GetKey;

  return function (...args: Parameters<Fn>) {
    const key = keyFn(...args);
    if (!Object.prototype.hasOwnProperty.call(memo, key)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      memo[key] = fn(...args);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return memo[key];
  } as Fn;
};
