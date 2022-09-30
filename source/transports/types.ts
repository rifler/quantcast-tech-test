export type TransportOptions = {
  url: string;
  timeout?: number;
  method: 'GET' | 'POST';
  // Json
};

export type TransportResponse = Record<string, unknown> | string | undefined;

export type TransportFn = (options: TransportOptions) => Promise<TransportResponse>;

export type Transport = () => false | TransportFn;
