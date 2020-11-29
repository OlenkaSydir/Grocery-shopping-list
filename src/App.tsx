import React, {useEffect, useState} from "react";
import {initialItems} from "./initialItems";
import {ItemList} from "./ItemList";
import {AddItemForm} from "./AddItemForm";
import {AddItem, EditItem, FilterFunc, Item, RemoveItem, SortFunc, ToggleComplete} from "./types";
import './App.css'
import './fonts.css'


const App: React.FC = () => {
    const [items, setItems] = useState<Array<Item>>(initialItems);
    const [sortedItems, setSortedItems] = useState<Array<Item>>(initialItems);

    const [ability, setAbility] = useState<string>('all')

    const handleAbility = (e: any) => {
        setAbility(e.target.value)
    }

    const toggleComplete: ToggleComplete = selectedItem => {
        const updatedItems = items.map(item => {
            if (item === selectedItem) {
                return {...item, done: !item.done};
            }
            return item;
        });
        setItems(updatedItems);
    };

    const removeItem: RemoveItem = name => {
        const removeArr = [...items].filter(item => item.name !== name)
        setItems(removeArr)
    }

    const editItem: EditItem = (selectedItem, newValue) => {
        setItems(prev => prev.map(item => (item.name === selectedItem.name ? newValue : item)))
    }

    // const sortByPriority: SortFunc = allItems => {
    //
    // }

    const addItem: AddItem = newItem => {
        let AllItems = [...items, {
            name: newItem.name,
            available: newItem.available,
            priority: newItem.priority,
            dateOfUpdate: newItem.dateOfUpdate,
            done: newItem.done
        }]

        setItems(sortByPriority(AllItems))

    };
    const filterByAbility: FilterFunc = (allItems, ability) => {
        if (allItems) {
            if (ability === 'available') {
                return allItems.filter(item => item.available)
            } else if (ability === 'unavailable') {
                return allItems.filter(item => !item.available)
            } else if (ability === 'all') {
                return allItems
            }
        } else {
            return []
        }
    }
    const sortByPriority: SortFunc = (allItems) => {
        if (allItems) {
            allItems = allItems.sort((a, b) => (a.priority > b.priority) ? 1 :-1);
            allItems = allItems.sort((a, b) => (a.priority === b.priority && a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1)
            return allItems
        } else {
            return []
        }
    }
    useEffect(() => {
            const allSortedItems = filterByAbility(items, ability)
            if (allSortedItems)
                setSortedItems(allSortedItems)
        }, [ability, items]
    )


    return (
        <div className='list-box'>
            <p className='heading'>
                My Shopping List
            </p>

            <AddItemForm addItem={addItem}/>
            <p className='item-list'>
                My Items
            </p>
            <div >
                `<select
                className='filter-select'
                onChange={handleAbility}
                value={ability}>
                <option value={"all"}>
                    All
                </option>
                <option value={"available"}>
                    Have
                </option>
                <option value={"unavailable"}>
                    Ran Out
                </option>`
            </select>
            </div>

            <ItemList items={sortedItems} toggleComplete={toggleComplete} removeItem={removeItem} editItem={editItem}/>
        </div>
    );
};

export default App;
