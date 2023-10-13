import { query } from "./query";
import { TodoResponses } from "./schema";
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
