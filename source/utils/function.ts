const firstArg = <T>(a: T): T => a;

type AnyFunc = (...args: any[]) => any;
export type GenericFn<Fn extends AnyFunc> = (...args: Parameters<Fn>) => ReturnType<Fn>;

export const memoize = <Fn extends GenericFn<Fn>>(fn: Fn, getKey?: (...arg: Parameters<Fn>) => string): Fn => {
  const memo: Record<string, ReturnType<Fn>> = {};
  type GetKey = Exclude<typeof getKey, undefined>;
  const keyFn: GetKey = getKey ?? firstArg as unknown as GetKey;

  return function (...args: Parameters<Fn>) {
    const key = keyFn(...args);
    if (!Object.prototype.hasOwnProperty.call(memo, key)) {
      memo[key] = fn(...args);
    }

    return memo[key];
  } as Fn;
};
