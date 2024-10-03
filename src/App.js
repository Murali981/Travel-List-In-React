import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  /* HOW WE USE CONTROLLED ELEMENTS WHEN WE USE FORMS WITH REACT ? */
  /* By default the input fields like the input , select where they mantain there own state inside the DOM. So basically inside the HTML 
element itself , Now this makes it hard to read their values and also it leaves the state right inside the DOM which is not ideal for
many reasons . So in React we like to keep all the state in just one central place. So inside the React application and not inside 
the DOM . So inorder to do that we use a technique called CONTROLLED elements and with this technique it is the REACT who controls 
and owns the state of these input fields but no longer the DOM. So since we want to keep this data inside the application it means
that we need some state because the form data changes over time and also we want to mantain our application in sync with it. Inorder to
implement the controlled elements technique we will follow three steps */

  // Step 1: Create a State
  const [description, setDescription] = useState(""); // Now use this state as the value of the input field.
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]); // As we are rendering multiple items onto the UI. So it has to be an array state.

  // Here the above items state has to be rendered in "PackingList" component but we can't pass this items state as props because
  // "PackingList" component is a sibling component to this "Form" component as we already know state can be passed as props only
  // from the parent to child component but it cannot be passed from sibling component to sibling component and also it cannot be passed
  // as a prop from child to parent because props can only be passed down from parent to child but these cannot be passed from child to
  // parent as there will be only one way flow. So the solution to this problem is , Lifting up the state which is lifting the state to the
  // closest parent component to this "Form" component which is the "App" component . So we will lift this "items" array state to the
  // "App" component to solve this problem.

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* By default the e.target.value is a string but if you see the quantity should be a number but not string. So to 
        convert it into a number you have to put the value inside the Number(e.target.value) function which will convert it into a number */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* {Array.from({ length: 20 }, (_, i) => i + 1)} => This will simply create an array containing elements from 1 to 20 */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Step 2: setting the value field to description value={description} */}
      {/* Step 3: listening to the change event which is setDescription(e.target.value) */}
      <button>Add</button>
      {/* If we write onClick={handleSubmit} then this event will happen only when we click on the button but we want the submit event
      happen by pressing enter on the input element. So that's why we have written onSumit={handleSubmit} directly on the form
      element itself so that the above behaviour will happen */}
      {/* By using the concept of controlled elements we will get the submitted form data into the handleSubmit() handler */}
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* The below item.packed is always a true (or) false value and this is exactly the type of value that we need to pass into 
      the value of the checkbox and there will be a change(onChange) event happens whenever we click on the checkbox */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* We have to make this checkbox input a controlled element. Remember a controlled element means that the element has the 
      value defined by some state and also it has an event handler which listens for a change and updates the state accordingly */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Note : When we simply specify the function here (onClick={onDeleteItem}) to this onClick event of the button then React will call
// the function as the event happens and it does so by passing the event(e) object but right now we don't want to recieve the event
// but instead the "id" of the current item. So we have to create a new function which is a callback function like this
// onClick={() => onDeleteItem(item.id)} passing the item.id into the callback function which is onDeleteItem(item.id). So this is
// very important , Please remember that if you didn't make it a callback function then the react will immediately call the function.
// But we want a function inside the onClick={} event so that React then call this onDeleteItem() function only when the "onClick" event
// happens

function Stats({ items }) {
  // Implementing the early return as conditional rendering as below
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length; // The numPacked is simply derived from the items array filtered by the
  // items that are already packed (items.filter((item) => item.packed) )=> This will give you a new array which will be filtered
  // only with the items that are packed then we will calculate this new filtered array's length (items.filter((item) => item.packed).length)
  // and that will be stored in numPacked.
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you have already packed
        ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
