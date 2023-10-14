import { redirect } from "next/navigation";
import { query } from "./query";
import {
  SubTodoResponse,
  SubTodoResponses,
  TodoResponse,
  TodoResponses,
} from "./schema";
import { getUserData } from "./userFunctions";

export async function getTodos() {
  const user = await getUserData();
  const rawTodos = await query(
    `SELECT * from todos WHERE userID=? ORDER BY created DESC`,
    [user.id]
  );
  const hasTodos = rawTodos.length > 0;
  let parsedData = null;
  if (hasTodos) {
    parsedData = TodoResponses.safeParse(rawTodos);

    if (!parsedData.success) throw new Error(parsedData.error.message);
    else parsedData = parsedData.data;
  }
  return {
    todos: parsedData,
    hasTodos: hasTodos,
  };
}

export async function getTodo({ todoID }: { todoID: string }) {
  const rawTodos = await query(`SELECT * from todos WHERE id=?`, [todoID]);
  const hasTodos = rawTodos.length > 0;

  let parsedData = null;

  if (hasTodos) {
    parsedData = TodoResponse.safeParse(rawTodos[0]);

    if (!parsedData.success) throw new Error(parsedData.error.message);
    else parsedData = parsedData.data;
  } else {
    redirect("/404");
  }
  return {
    todos: parsedData,
    hasTodos: hasTodos,
  };
}

export async function getAllSubTodos({ todoID }: { todoID: number }) {
  const rawTodos = await query(`SELECT * from subTodos WHERE todoID=?`, [
    todoID,
  ]);
  const hasTodos = rawTodos.length > 0;
  let parsedData = null;
  if (hasTodos) {
    parsedData = SubTodoResponses.safeParse(rawTodos);

    if (!parsedData.success) throw new Error(parsedData.error.message);
    else parsedData = parsedData.data;
  }
  return {
    todos: parsedData,
    hasTodos: hasTodos,
  };
}

export async function getSubTodo({ todoID }: { todoID: string }) {
  const rawTodos = await query(`SELECT * from subTodos WHERE id=?`, [todoID]);
  const hasTodos = rawTodos.length > 0;

  let parsedData = null;

  if (hasTodos) {
    parsedData = SubTodoResponse.safeParse(rawTodos[0]);

    if (!parsedData.success) throw new Error(parsedData.error.message);
    else parsedData = parsedData.data;
  } else {
    redirect("/404");
  }
  return {
    todos: parsedData,
    hasTodos: hasTodos,
  };
}
