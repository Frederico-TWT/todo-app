import { pgTable, serial, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 255 }).notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const createTodoSchema = z.object({
  text: z.string().min(1, "Text cannot be empty").max(255),
});

export const toggleTodoSchema = z.object({
  id: z.number().int().positive(),
});

export const deleteTodoSchema = z.object({
  id: z.number().int().positive(),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;

