type Callback = (...data: any[]) => void;

export class EventEmitter {
  private listeners: Record<string, Callback[]> = {};

  on(eventName: string, callback: Callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  un(eventName: string, callback?: Callback) {
    if (callback) {
      const listeners = this.listeners[eventName] || [];

      listeners.filter(listener => listener !== callback);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.listeners[eventName];
    }
  }

  emit(eventName: string, ...data: any[]) {
    const listeners = this.listeners[eventName];

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      listener(...data);
    }
  }

  destroy() {
    this.listeners = {};
  }
}
