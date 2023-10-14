"use server";

import { query } from "@/lib/query";
import { TodoInput } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function EditTodoAction(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const desc = formData.get("description");

  const form = {
    name: name,
    description: desc,
    id: prevState.id,
  };

  const parsedInput = TodoInput.safeParse(form);
  if (!parsedInput.success) {
    return {
      message: parsedInput.error.issues[0].message,
      type: "error",
      id: prevState.id,
    };
  }

  await query("UPDATE todos SET name = ? WHERE id= ?", [
    parsedInput.data.name,
    prevState.id,
  ]);

  await query("UPDATE todos SET description = ? WHERE id= ?", [
    parsedInput.data.description,
    prevState.id,
  ]);
  revalidatePath("/dash");
  revalidatePath(`/todo/${prevState.id}`);
  return {
    message: "Successfully Edited Todo",
    type: "success",
    id: prevState.id,
  };
}
