import { EventEmitter } from './event-emitter';

export class Observable<T> extends EventEmitter<T> {
  constructor(private _value: T) {
    super();
  }

  public get value(): T {
    return this._value;
  }

  public set(value: T): void {
    this._value = value;
    this.emit(this._value);
  }

  public update(callback: (value: T) => T): void {
    this._value = callback(this._value);
    this.emit(this._value);
  }
}
