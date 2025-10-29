import { db } from "@/db";
import { todos } from "./schema";
import { asc } from "drizzle-orm";

export async function getAllTodos() {
  try {
    return await db.select().from(todos).orderBy(asc(todos.createdAt));
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
}

