"use server";

import { query } from "@/lib/query";
import { getTodo } from "@/lib/todoFunctions";
import { getUserData } from "@/lib/userFunctions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteTodoAction(prevState: any, formData: FormData) {
  const todo = await getTodo({ todoID: prevState.id });
  const user = await getUserData();

  if (todo.todos.userID !== user.id) throw new Error("Unauthorized");

  await query("DELETE FROM todos WHERE id=?", [todo.todos.id]);

  revalidatePath(`/dash`);
  redirect(`/dash`);
}
