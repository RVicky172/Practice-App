import { type SubmitEvent, useState } from "react";

type TodoInputProps = {
  onAddTodo: (text: string) => void;
};

function TodoInput({ onAddTodo }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    onAddTodo(trimmedValue);
    setValue("");
  };

  return (
    <form
      className="flex gap-2 transition-colors duration-300"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 border rounded px-3 py-2 transition-colors duration-300 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
        placeholder="Add a todo"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        className="px-4 py-2 rounded font-semibold transition-all duration-300 hover:shadow-md active:scale-95 bg-blue-600 dark:bg-blue-500 text-white"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
