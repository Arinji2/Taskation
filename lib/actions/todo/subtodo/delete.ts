"use server";

import { query } from "@/lib/query";
import { getSubTodo } from "@/lib/todoFunctions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteSubTodoAction(prevState: any, formData: FormData) {
  const todo = await getSubTodo({ todoID: prevState.id });

  await query("DELETE FROM subTodos WHERE id=?", [todo.todos.id]);

  revalidatePath(`/todo/${todo.todos.todoID}`);
  redirect(`/todo/${todo.todos.todoID}`);
}
