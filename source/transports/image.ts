import type {Transport} from './types';

export const imageTransport: Transport = () => async options => new Promise((resolve, reject) => {
  const image = new Image();
  const timeoutId = setTimeout(reject, options.timeout ?? 3000);

  image.addEventListener('error', error => {
    reject(error);
    clearTimeout(timeoutId);
  });

  image.addEventListener('load', () => {
    resolve(undefined);
    clearTimeout(timeoutId);
  });

  image.src = options.url;
});
