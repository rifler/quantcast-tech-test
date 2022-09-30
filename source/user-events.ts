/**
 * Events generated in user-land
 *
 * types & type assertions
 */
import {isString, isUndefined} from '@/utils';

export type PixelEvent = {
  account: string;
  labels?: string;
};

export type ExampleEvent = {
  requiredField: string;
  optionalField?: string;
};

export type Events = PixelEvent & ExampleEvent;

export const isPixelEvent = (event: any): event is PixelEvent => isString(event?.['account']) && (
  isUndefined(event?.['labels']) || isString(event?.['labels'])
);

export const isExampleEvent = (event: any): event is PixelEvent => isString(event?.['requiredField']) && (
  isUndefined(event?.['requiredField']) || isString(event?.['requiredField'])
);
