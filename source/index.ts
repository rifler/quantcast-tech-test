import {arrayEventEmitter} from '@/event-emitter/array-event-emitter';

init();

function init() {
  window['QuantcastInternal'] = window['QuantcastInternal'] || {};
  /**
   *
     * In case of `dist/measurement.js` installed more than once
     */
  if (window['QuantcastInternal'].inited) {
    return;
  }

  window['QuantcastInternal'].inited = true;

  window['events'] = window['events'] || [];

  const {emitter} = arrayEventEmitter(window['events']);

  emitter.on('add', (event: Record<string, string>) => {
    console.log('new event value is pushed', event);
  });

  for (const event of window['events']) {
    console.log('one of initial event value', event);
  }
}
