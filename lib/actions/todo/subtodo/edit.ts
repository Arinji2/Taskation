"use server";

import { query } from "@/lib/query";
import { SubTodoInput } from "@/lib/schema";
import { getSubTodo } from "@/lib/todoFunctions";
import { revalidatePath } from "next/cache";

export async function EditSubTodoAction(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const desc = formData.get("description");

  const form = {
    name: name,
    description: desc,

    parentTodo: prevState.parentTodo,
  };

  const parsedInput = SubTodoInput.safeParse(form);
  if (!parsedInput.success) {
    return {
      message: parsedInput.error.issues[0].message,
      type: "error",
      id: prevState.id,
      parentTodo: prevState.parentTodo,
    };
  }
  await query("UPDATE subTodos SET name = ? WHERE id= ?", [
    parsedInput.data.name,
    prevState.id,
  ]);

  await query("UPDATE subTodos SET description = ? WHERE id= ?", [
    parsedInput.data.description,
    prevState.id,
  ]);

  revalidatePath(`/todo/${prevState.parentTodo}`);
  revalidatePath(`/todo/${prevState.parentTodo}/${prevState.id}`);
  return {
    message: "Successfully Edited Todo",
    type: "success",
    id: prevState.id,
    parentTodo: prevState.parentTodo,
  };
}
