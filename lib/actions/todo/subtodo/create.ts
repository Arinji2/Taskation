"use server";

import { query } from "@/lib/query";
import { SubTodoInput } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function CreateSubTodoAction(prevState: any, formData: FormData) {
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
      id: 0,
      parentTodo: prevState.parentTodo,
    };
  }

  const id = Math.floor(10000 + Math.random() * 90000);

  await query(
    "INSERT INTO subTodos (id, name, description, todoID) VALUES (?, ?, ?, ?)",
    [
      id,
      parsedInput.data.name,
      parsedInput.data.description,
      parsedInput.data.parentTodo,
    ]
  );
  revalidatePath(`/todo/${prevState.parentTodo}`);
  return {
    message: "Successfully Created Sub Todo",
    type: "success",
    id: id,
    parentTodo: prevState.parentTodo,
  };
}
