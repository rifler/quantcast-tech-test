import {arrayEventEmitter} from '../array-event-emitter';

describe('arrayEventEmitter', () => {
  it('emits `add` event on push', () => {
    const array = [1];
    const {emitter} = arrayEventEmitter(array);
    const listener = jest.fn();
    emitter.on('add', listener);

    array.push(2);

    expect(listener).toHaveBeenCalledTimes(1);
  });
  it('emits `add` event on unshift', () => {
    const array = [1];
    const {emitter} = arrayEventEmitter(array);
    const listener = jest.fn();
    emitter.on('add', listener);

    array.unshift(0);

    expect(listener).toHaveBeenCalledTimes(1);
  });
  it('supports multiple values passed to array', () => {
    const array = [1];
    const {emitter} = arrayEventEmitter(array);
    const listener = jest.fn();

    emitter.on('add', listener);

    array.push(2, 3);
    array.unshift(-1, 0);

    expect(listener).toHaveBeenCalledTimes(4);
  });
  it('actually pass values to an array', () => {
    const array = [1];
    const {emitter} = arrayEventEmitter(array);
    const listener = jest.fn();

    emitter.on('add', listener);

    array.push(2, 3, 4);
    array.unshift(0);
    array.unshift(-2, -1);

    expect(array).toHaveLength(7);
    const isEqual = [-2, -1, 0, 1, 2, 3, 4].every((value, index) => value === array[index]);
    expect(isEqual).toBeTruthy();
  });
});
