import { useEffect, useMemo, useReducer, useState } from "react";

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

 function todoAction(previousState: TodoState, action: TodoAction) {
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
  const [state, dispatchAction] = useReducer(todoAction, { todos: [] });
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
    <section className="max-w-2xl mx-auto p-5 rounded-lg shadow-sm border transition-colors duration-300 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-2 transition-colors duration-300 text-slate-900 dark:text-slate-100">
        Todo Application
      </h2>
      <p className="mb-4 transition-colors duration-300 text-slate-500 dark:text-slate-400">
        Add, toggle, delete, and filter todos using React + TypeScript.
      </p>

      <TodoInput onAddTodo={handleAddTodo} />

      <div className="mt-4">
        <TodoFilters activeFilter={filter} onChangeFilter={setFilter} />
      </div>

      <div className="mt-4">
        {isLoading && (
          <p className="text-sm transition-colors duration-300 text-slate-500 dark:text-slate-400">
            Loading todos...
          </p>
        )}
        {error && (
          <p className="text-sm transition-colors duration-300 text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {!isLoading && filteredTodos.length === 0 && (
          <p className="text-sm transition-colors duration-300 text-slate-500 dark:text-slate-400">
            No todos for this filter.
          </p>
        )}

        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id
              }
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
