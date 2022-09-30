import {arrayEventEmitter} from '@/event-emitter';
import {accountMiddleware, fpaMiddleware, labelsMiddleware, randomMiddleware, urlMiddleware} from '@/middlewares';
import {beaconTransport, imageTransport} from '@/transports';
import {createSender} from '@/sender';
import {isPixelEvent, isExampleEvent} from '@/user-events';
import {noop} from '@/utils';

const pixelSender = createSender({
  prefixUrl: 'https://pixel.quantserve.com/pixel',
  transports: [imageTransport(), beaconTransport()],
  middlewares: [accountMiddleware, fpaMiddleware, labelsMiddleware, randomMiddleware, urlMiddleware],
  method: 'GET',
  timeout: 3000,
});

const exampleSender = createSender({
  prefixUrl: 'https://pixel.quantserve.com/another_example_endpoint',
  transports: [/* separate set of transports */],
  middlewares: [/* separate set of middlewares */],
  method: 'POST',
});

init();

function init() {
  window['QuantcastInternal'] = window['QuantcastInternal'] || {};
  /**
   * In case of `dist/measurement.js` installed more than once
   */
  if (window['QuantcastInternal'].inited) {
    return;
  }

  window['QuantcastInternal'].inited = true;

  window['events'] = window['events'] || [];

  handleEventsChange(window['events']);
}

function sendEvent(event: unknown) {
  if (isPixelEvent(event)) {
    pixelSender(event).catch(noop);
  } else if (isExampleEvent(event)) {
    exampleSender(event).catch(noop);
  }
}

function handleEventsChange(events: typeof window['events']) {
  const {emitter} = arrayEventEmitter(events);

  emitter.on('add', sendEvent);

  for (const event of window['events']) {
    sendEvent(event);
  }
}
