import { Item } from "./types";

export const initialItems: Array<Item> = [
  {
    name: "Milk",
    available: true,
    dateOfUpdate: new Date().toDateString(),
    priority:1,
    done: false
  },
  {
    name: "Coffee",
    available: true,
    dateOfUpdate: new Date().toDateString(),
    priority:2,
    done:false
  }
];
