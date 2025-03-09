type Listener<T> = (value: T) => void;

export class EventEmitter<T> {
  protected listeners: Set<Listener<T>> = new Set();

  public emit(value: T): void {
    this.listeners.forEach((listener) => listener(value));
  }

  public subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return this.unsubscribe.bind(this, listener);
  }

  public unsubscribe(callback: Listener<T>): void {
    this.listeners.delete(callback);
  }
}
