export default function Item({ item, onDeleteItem, onToggleItem }) {
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
