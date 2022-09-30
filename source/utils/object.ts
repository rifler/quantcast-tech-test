// Import {isFunction} from '@/utils/assertion'

type EntriesArg<T> = Record<string, T> | ArrayLike<T>;

// Todo ponyfill for older browsers
export const entries = <T>(objectLike: EntriesArg<T>) =>
  Object.entries(objectLike);
// If (isFunction(Object.entries)) {
//     return Object.entries(objectLike)
// }
//
// const result = []
// for (let prop in objectLike) {
//     result.push(prop, objectLike[prop])
// }
// return Object.keys(objectLike).reduce((acc, key) => {
//     acc.push([key, object[key]])
//     return acc
// }, [] as [keyof typeof objectLike, T][])

