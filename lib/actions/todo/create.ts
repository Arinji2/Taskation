"use server";

import { query } from "@/lib/query";
import { TodoInput } from "@/lib/schema";
import { getUserData } from "@/lib/userFunctions";
import { revalidatePath } from "next/cache";

export async function CreateTodoAction(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const desc = formData.get("description");

  const form = {
    name: name,
    description: desc,
  };

  const parsedInput = TodoInput.safeParse(form);
  if (!parsedInput.success) {
    return {
      message: parsedInput.error.issues[0].message,
      type: "error",
      id: 0,
    };
  }

  const user = await getUserData();
  const id = Math.floor(10000 + Math.random() * 90000);

  await query(
    "INSERT INTO todos (id, name, description, userID) VALUES (?, ?, ?, ?)",
    [id, parsedInput.data.name, parsedInput.data.description, user.id]
  );

  revalidatePath("/dash");

  return {
    message: "Successfully Created Todo",
    type: "success",
    id: id,
  };
}
