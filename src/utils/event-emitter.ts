type Listener<T> = (value: T) => void;

export class EventEmitter<T> {
  protected listeners: Set<Listener<T>> = new Set();

  public emit(value: T): void {
    this.listeners.forEach((listener) => listener(value));
  }

  public subscribe(callback: Listener<T>): () => void {
    this.listeners.add(callback);
    return this.unsubscribe.bind(this, callback);
  }

  public unsubscribe(callback: Listener<T>): void {
    this.listeners.delete(callback);
  }
}
