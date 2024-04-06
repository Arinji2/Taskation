"use server";

import { query } from "@/lib/query";
import { getSubTodo } from "@/lib/todoFunctions";
import { revalidatePath } from "next/cache";

export async function DeleteSubTodoAction(formData: FormData) {
  const id = formData.get("id")!.toString();
  const todo = await getSubTodo({ todoID: id });

  await query("DELETE FROM subTodos WHERE id=?", [todo.todos.id]);

  revalidatePath(`/todo/${todo.todos.todoID}`);

  return {
    type: "success",
    message: "Successfully Deleted SubTodo",
    id: todo.todos.todoID,
  };
}
