import { Item } from '../types/item';
import { Observable } from '../utils/observable';
import { DEFAULT_ID } from './constants/state-options';

export class ItemState {
  private id = DEFAULT_ID;

  public items = new Observable<Item[]>([]);

  public add(item: Omit<Item, 'id'>): void {
    this.items.update((items) => [...items, { ...item, id: this.id++ }]);
  }

  public remove(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));

    if (!this.items.value.length) {
      this.id = DEFAULT_ID;
    }
  }

  public clear(): void {
    this.items.set([]);

    this.id = DEFAULT_ID;
  }
}

export const itemState = new ItemState();
