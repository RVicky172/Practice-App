export type TodoFilter = "all" | "completed" | "pending";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface DummyJsonTodo {
  id: number;
  todo: string;
  completed: boolean;
}
