export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export type CreateTodoInput = {
  text: string;
};

export type ToggleTodoInput = {
  id: number;
};

export type DeleteTodoInput = {
  id: number;
};

