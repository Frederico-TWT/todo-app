"use client";

import { useState } from "react";
import { trpc } from "./providers";

export default function Home() {
  const [input, setInput] = useState("");
  const utils = trpc.useUtils();

  const { data: todos } = trpc.todo.getAll.useQuery();

  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      setInput("");
      utils.todo.getAll.invalidate();
    },
  });

  const toggleTodo = trpc.todo.toggle.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      createTodo.mutate({ text: input.trim() });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 border-[1px] border-slate-700 rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
          Todo App (v7)
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo.mutate({ id: todo.id })}
                className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-zinc-500"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-zinc-500 dark:text-zinc-400"
                    : "text-black dark:text-white"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo.mutate({ id: todo.id })}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos?.length === 0 && (
          <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
            No todos yet. Add one above!
          </p>
        )}
      </main>
    </div>
  );
}
