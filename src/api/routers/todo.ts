import { publicProcedure, router } from "@/server/trpc";
import { createTodo, toggleTodo, deleteTodo } from "@/api/access-patterns/todo/mutations";
import { getAllTodos } from "@/api/access-patterns/todo/gets";
import { createTodoSchema, toggleTodoSchema, deleteTodoSchema } from "@/api/access-patterns/todo/schema";

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    return await getAllTodos();
  }),

  create: publicProcedure
    .input(createTodoSchema)
    .mutation(async ({ input }) => {
      return await createTodo(input.text);
    }),

  toggle: publicProcedure
    .input(toggleTodoSchema)
    .mutation(async ({ input }) => {
      return await toggleTodo(input.id);
    }),

  delete: publicProcedure
    .input(deleteTodoSchema)
    .mutation(async ({ input }) => {
      return await deleteTodo(input.id);
    }),
});

