import React, {useState, ChangeEvent, FormEvent} from "react";
import {AddItem, Item} from "./types";
import './AddItemForm.css'

interface AddItemFormProps {

    addItem?: AddItem;
    editItem?: Item;
    onEditSubmit?: (editItem: Item) => void;
}


export const AddItemForm: React.FC<AddItemFormProps> = ({addItem, editItem, onEditSubmit}) => {
    const [newItem, setNewItem] = useState<Item>(editItem ? editItem : {
        name: '',
        priority: 1,
        available: true,
        dateOfUpdate: new Date().toDateString(),
        done: false,
    });

    const handleChange = (e: any) => {
        let name = {...newItem, ...{name: e.target.value}}
        setNewItem(name)
    }
    const handlePriority = (e: any) => {
        let priority = {...newItem, ...{priority: e.target.value}}
        setNewItem(priority)
    }
    const handleAvailability = () => {
        let available = {...newItem, ...{available: !newItem.available}}
        setNewItem(available)
    }

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (editItem && onEditSubmit) {
            onEditSubmit(newItem)
        } else {
            if (addItem) {
                addItem(newItem);
            }
        }
        setNewItem({
            name: '',
            priority: 1,
            available: true,
            dateOfUpdate: new Date().toDateString(),
            done: false
        });
    };

    return (
        <form className='form'>
            <p>Input the shopping item</p>

            <input type="text"
                   value={newItem.name}
                   name='text'
                   onChange={handleChange}
                   className='list-input'
            />
            <div>
                <p>
                    Select the priority
                </p>

                <select className='list-priority'
                        onChange={handlePriority}
                        value={newItem.priority}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div>
                <p>
                    Is your item available?
                </p>
                <input
                    type="checkbox"
                    checked={newItem.available}
                    onChange={handleAvailability}
                    className='form-checkbox'
                />
            </div>
            <button className='form-btn' type="submit" onClick={handleSubmit} disabled={!newItem.name}>
                Add Item
            </button>
        </form>
    );
};
