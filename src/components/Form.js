import { useState } from "react";

export default function Form({ onAddItems }) {
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
