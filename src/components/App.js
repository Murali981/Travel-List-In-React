import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// // const initialItems = [
// //   { id: 1, description: "Passports", quantity: 2, packed: false },
// //   { id: 2, description: "Socks", quantity: 12, packed: true },
// //   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]); // As we are rendering multiple items onto the UI. So it has to be an array state.

  function handleAddItems(item) {
    setItems((items) => [...items, item]); // Here the new items array will basically be the current items array plus the new item added to the end and what
    // does this mean is , the new state depends on the current state. Therefore here we have to pass a call-back function but not just a
    // single value

    /* Remember in react we will not be allowed to mutate state which is setItems((items) => items.push(item)) , here we are 
    directly mutating the items array and so the solution here is to create a brand new array which contains all the current items
    plus the new one which is [...items,item] => here we are spreading the current items and then simply adding another items to this
    newly spreaded items array */
  } // This handleAddItems function will recieve a new item object as an argument which will be
  // then added to the items array.

  function handleDeleteItem(id) {
    // We will delete the item from the user interface by updating the state.
    setItems((items) => items.filter((item) => item.id !== id)); // Into this setItems() setter function we need the new array after the
    // item has been deleted. Once again this new items array will be based on the current one where we should have a callback function
    // which will receive the current item as it's input and then items.filter() will loop over the array and in each iteration it will
    // get access to the items object and now we want to filter out the item that has the id that we have got as the argument to the
    // "handleDeleteItem(id)" function and whenver the id that we have passed in to the handleDeleteItem(id) function is different from
    // items array id then the item will end up in the new array. So to the array of items that have not been deleted But when this is
    // false , so when the item.id === id then this element will be no longer part of the final array. So this is procedure we follow
    // to delete the items from the items array
  } // Each item has an unique id , So delete an item from the items array we will pass the id such that
  // we can remove the corresponding object from the items array.

  function handleToggleItem(id) {
    setItems((items) =>
      items.map(
        (item) => (item.id === id ? { ...item, packed: !item.packed } : item) // whenever the item has the id that is equal to the
        // id that we have passed in , So this is the object that we have to actually update then we create a brand new object
        // based on the current item {...item, packed: !item.packed} and also we set the packed to opposite of packed and otherwise
        // return the current item
      )
    );
  } // Here we will only toggle the packed property as we will not allow anyone to update the entire
  // object but only to change the value of the packed property . Inorder to know which item to change we have to pass in the id.

  function handleClearList() {
    const confirmed = window.confirm(
      // Here window comes from the global API object provided by the browser but it is not related to
      // javascript
      "Are you sure you want to delete all the items"
    ); // When the user clicks on okay then the confirmed will become true and if they click cancel then the confirmed will become false.
    if (confirmed) {
      setItems([]); // Here we will clear the items array . So this is a simple operation that will just set the items array to an empty array.
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
