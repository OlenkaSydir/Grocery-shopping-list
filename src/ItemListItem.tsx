import React, {useState} from "react";
import "./ItemListItem.css";
import {EditItem, Item, RemoveItem, ToggleComplete} from "./types";
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import {AddItemForm} from "./AddItemForm";


interface ItemListItemProps {
  item: Item;
  toggleComplete: ToggleComplete;
  removeItem: RemoveItem;
  editItem: EditItem;
}


const ItemListItem: React.FC<ItemListItemProps> = ({
  item,
  toggleComplete,
  removeItem,
    editItem,
}) => {
  const [edit, setEdit] = useState<Item>()

  const submitUpdate = (value: Item) => {
    if(edit!==undefined){
    editItem(edit, value);
    setEdit({
      name : edit.name,
      priority: edit.priority,
      available: edit.available,
      dateOfUpdate: new Date().toDateString(),
      done: edit.done,
    });
    }
  };

  if (edit) {
    return <AddItemForm editItem={edit} onEditSubmit={submitUpdate} />;
  }
  return (
    <li>
      <label className={item.done ? "done" : undefined}>
        <div>
          <input
            type="checkbox"
            onChange={() => toggleComplete(item)}
            checked={item.done}
            className='list-item-checkbox'
          />
          <div className='item-property'>
            Name: <span className='item-property-value'>{item.name}</span>
          </div>
          <div className='item-property'>
            Priority: <span className='item-property-value'>{item.priority}</span>
          </div>
          <div className='item-property'>
            Date of last change: <span className='item-property-value'>{item.dateOfUpdate}</span>
          </div>
          <div className='item-property'>
            Availability: <span className='item-property-value'>{item.available ? 'YES' : 'NO'}</span>
          </div>
      </div>
        <div className='edit-delete-buttons'>
          <AiOutlineEdit onClick={() => {setEdit(item)}}
                      className='edit-icon'/>
          <RiDeleteBinLine onClick={() => removeItem(item.name)}
                             className='delete-icon'
          />
        </div>

      </label>
    </li>
  );
};
export default ItemListItem;