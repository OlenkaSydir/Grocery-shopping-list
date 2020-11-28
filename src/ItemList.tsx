import React from "react";
import {Item, ToggleComplete, RemoveItem, EditItem} from "./types";
import ItemListItem from "./ItemListItem";

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
  removeItem: RemoveItem;
  editItem: EditItem;
}


export const ItemList: React.FC<ItemListProps> = ({
  items,
  toggleComplete,
   removeItem,
    editItem,
}) => {
  return (
    <ul>
      {items.map(item => (
        <ItemListItem
          key={item.name}
          item={item}
          toggleComplete={toggleComplete}
          removeItem={removeItem}
          editItem={editItem}
        />
      ))}
    </ul>
  );
};
