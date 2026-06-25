import { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 border rounded p-3 transition-colors duration-300 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
          type="checkbox"
        />
        <span
          className={`transition-colors duration-300 ${
            todo.completed
              ? "text-gray-400 dark:text-slate-500 line-through"
              : "text-gray-800 dark:text-slate-100"
          }`}
        >
          {todo.text}
        </span>
      </label>
      <button
        className="px-3 py-1 text-sm rounded font-medium transition-all duration-300 hover:shadow-sm active:scale-95 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
        onClick={() => onDeleteTodo(todo.id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
