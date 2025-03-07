import { Item } from '../types/item';
import { Observable } from '../utils/observable';

const DEFAULT_ID = 1;

export class ItemState {
  private id = DEFAULT_ID;

  public items = new Observable<Item[]>([]);

  public addItem(item: Omit<Item, 'id'>): void {
    this.items.update((items) => [...items, { ...item, id: this.id++ }]);
  }

  public removeItem(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));

    if (!this.items.value.length) {
      this.id = DEFAULT_ID;
    }
  }

  public clearItems(): void {
    this.items.set([]);

    this.id = DEFAULT_ID;
  }
}

export const itemState = new ItemState();
