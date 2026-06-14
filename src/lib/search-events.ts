type Listener = () => void;

let listeners: Listener[] = [];

export const searchEvents = {
  open() {
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: Listener) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};
