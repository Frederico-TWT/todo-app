import { db } from "@/db";
import { todos } from "./schema";
import { eq } from "drizzle-orm";

export async function createTodo(text: string) {
  try {
    const [todo] = await db
      .insert(todos)
      .values({ text })
      .returning();
    return todo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
}

export async function toggleTodo(id: number) {
  try {
    const [todo] = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);
    
    if (!todo) {
      throw new Error("Todo not found");
    }

    const [updated] = await db
      .update(todos)
      .set({ completed: !todo.completed })
      .where(eq(todos.id, id))
      .returning();
    
    return updated;
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw new Error("Failed to toggle todo");
  }
}

export async function deleteTodo(id: number) {
  try {
    await db.delete(todos).where(eq(todos.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo");
  }
}

