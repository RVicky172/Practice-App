import { FormEvent, useState } from "react";

type TodoInputProps = {
  onAddTodo: (text: string) => void;
};

function TodoInput({ onAddTodo }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    onAddTodo(trimmedValue);
    setValue("");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="flex-1 border border-gray-300 rounded px-3 py-2"
        placeholder="Add a todo"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
