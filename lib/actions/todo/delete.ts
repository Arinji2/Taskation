"use server";

import { query } from "@/lib/query";
import { getTodo } from "@/lib/todoFunctions";
import { getUserData } from "@/lib/userFunctions";
import { revalidatePath } from "next/cache";

export async function DeleteTodoAction(formData: FormData) {
  const id = formData.get("id")!.toString();
  const todo = await getTodo({ todoID: id });
  const user = await getUserData();

  if (todo.todos.userID !== user.id) throw new Error("Unauthorized");

  await query("DELETE FROM todos WHERE id=?", [todo.todos.id]);

  revalidatePath(`/dash`);
}
