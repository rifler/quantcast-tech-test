export const isUndefined = (input: any): input is undefined => typeof input === 'undefined';

export const isFunction = (input: any): input is (...data: any[]) => any => typeof input === 'function';

export const isString = (input: any): input is string => typeof input === 'string';
