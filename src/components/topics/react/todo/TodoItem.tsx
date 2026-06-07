import { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 border border-gray-200 rounded p-3">
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
          type="checkbox"
        />
        <span
          className={
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          }
        >
          {todo.text}
        </span>
      </label>
      <button
        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
        onClick={() => onDeleteTodo(todo.id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
