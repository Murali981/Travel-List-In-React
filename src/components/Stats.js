// Note : When we simply specify the function here (onClick={onDeleteItem}) to this onClick event of the button then React will call
// the function as the event happens and it does so by passing the event(e) object but right now we don't want to recieve the event
// but instead the "id" of the current item. So we have to create a new function which is a callback function like this
// onClick={() => onDeleteItem(item.id)} passing the item.id into the callback function which is onDeleteItem(item.id). So this is
// very important , Please remember that if you didn't make it a callback function then the react will immediately call the function.
// But we want a function inside the onClick={} event so that React then call this onDeleteItem() function only when the "onClick" event
// happens
export default function Stats({ items }) {
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
