import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  // Inside this packingList component we want to implement the sorting functionality as below. So to implement the sorting functionality
  // we have to make the below <select> element a controlled element . So to make it a controlled element we will follow three steps
  // which we have already discussed above. First step is , Creating a state and then the value={} and after that an onChange event.
  const [sortBy, setSortBy] = useState("input"); // By default these are sorted by input and this "input" is the string that we have exactly
  // defined in the below value field which is value="input" in the <option> tag below

  /* How do we get our REACT application to display the items sorted by whatever criteria that we have selected ?  */
  // ans) Basically we will just create new items which is then sorted by that criteria but we are not going to manipulate the original
  // items array. Instead we will use again the derived state because sorting one array can be computed based on the initial array
  let sortedItems;

  if (sortBy === "input") {
    // This is the default case
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description)); // With the help of slice we will take a copy of the array and this is important because the sort() method
    // in javascript is a mutating method and so if we didn't do this slice() then the items also get sorted as well
  }
  // sort((a,b) => a.description.localeCompare(b.description)) => here we want to sort the description alphabatically , We can use the
  // localCompare() method where we want to take "a" which is basically one object of the array and then we want to take the description
  // of that which is one of the properties of each object and since this is a string we can call localCompare() method and inside to this
  // localCompare(b.description) we will pass another string.

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  } // Since the packed property is a boolean we are converting it into a number and comparing

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/* We have to make all the below three options a controlled elements , So this is the reason we 
            have applied the value and onChange to this select box which is the parent of all the below three options */}
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
