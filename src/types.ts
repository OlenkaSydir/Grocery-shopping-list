export type Item = {
  name: string;
  priority: number;
  dateOfUpdate: string;
  available: boolean;
  done: boolean;
};

export type ToggleComplete = (selectedItem: Item) => void;

export type AddItem = (newItem: Item) => void;
export type RemoveItem = (name: string) => void;
export type EditItem = (item: Item, newItem: Item) => void;
export type FilterFunc = (allItems: Item[] , ability: string) => Item[]|undefined;
export type SortFunc = (allItems: Item[]) => Item[];