import { useActionState, useEffect, useMemo, useState } from "react";

import TodoFilters from "./TodoFilters";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { type DummyJsonTodo, type Todo, type TodoFilter } from "./types";

const TODOS_API = "https://dummyjson.com/todos?limit=10";

type TodoState = {
  todos: Todo[];
};

type TodoAction =
  | { type: "hydrate"; todos: Todo[] }
  | { type: "add"; text: string }
  | { type: "delete"; id: number }
  | { type: "toggle"; id: number };

async function todoAction(previousState: TodoState, action: TodoAction) {
  switch (action.type) {
    case "hydrate":
      return { todos: action.todos };
    case "add": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.text,
        completed: false,
      };

      return { todos: [newTodo, ...previousState.todos] };
    }
    case "delete":
      return {
        todos: previousState.todos.filter((todo) => todo.id !== action.id),
      };
    case "toggle":
      return {
        todos: previousState.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    default:
      return previousState;
  }
}

function TodoApp() {
  const [state, dispatchAction] = useActionState(todoAction, { todos: [] });
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(TODOS_API, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch todos.");
        }

        const data: { todos: DummyJsonTodo[] } = await response.json();
        const mappedTodos: Todo[] = data.todos.map((todo) => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed,
        }));

        dispatchAction({ type: "hydrate", todos: mappedTodos });
      } catch (caughtError) {
        if (caughtError instanceof Error && caughtError.name !== "AbortError") {
          setError(caughtError.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();

    return () => {
      controller.abort();
    };
  }, []);

  const handleAddTodo = (text: string) => {
    dispatchAction({ type: "add", text });
  };

  const handleDeleteTodo = (id: number) => {
    dispatchAction({ type: "delete", id });
  };

  const handleToggleTodo = (id: number) => {
    dispatchAction({ type: "toggle", id });
  };

  const filteredTodos = useMemo(() => {
    const todos = state.todos;

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  }, [filter, state.todos]);

  return (
    <section className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-2">Todo Application</h2>
      <p className="text-gray-500 mb-4">
        Add, toggle, delete, and filter todos using React + TypeScript.
      </p>

      <TodoInput onAddTodo={handleAddTodo} />

      <div className="mt-4">
        <TodoFilters activeFilter={filter} onChangeFilter={setFilter} />
      </div>

      <div className="mt-4">
        {isLoading && <p className="text-sm text-gray-500">Loading todos...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!isLoading && filteredTodos.length === 0 && (
          <p className="text-sm text-gray-500">No todos for this filter.</p>
        )}

        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              onDeleteTodo={handleDeleteTodo}
              onToggleTodo={handleToggleTodo}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TodoApp;
