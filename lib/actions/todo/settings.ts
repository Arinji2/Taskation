"use server";

import { query } from "@/lib/query";
import { revalidatePath } from "next/cache";

export async function ChangeCompleted({
  todoID,
  task,
  userID,
}: {
  todoID: number;
  task: boolean;
  userID: number;
}) {
  try {
    const binaryCompleted = task ? 1 : 0;
    const res = await query(
      `UPDATE todos SET completed = ? WHERE id = ? AND userID = ?`,
      [binaryCompleted, todoID, userID]
    );

    return {
      type: "success",
      message: "Successfully Changed Completed",
    };
  } catch (e) {
    return {
      type: "error",
      message: `Error Changing Completed||${e}`,
    };
  } finally {
    revalidatePath(`/todo/${todoID}`);
  }
}
export async function ChangePublic({
  todoID,
  task,
  userID,
}: {
  todoID: number;
  task: boolean;
  userID: number;
}) {
  try {
    const binaryCompleted = task ? 1 : 0;
    await query(`UPDATE todos SET public = ? WHERE id = ? AND userID = ?`, [
      binaryCompleted,
      todoID,
      userID,
    ]);

    return {
      type: "success",
      message: "Successfully Changed Visibility",
    };
  } catch (e) {
    return {
      type: "error",
      message: `Error Changing Visibility||${e}`,
    };
  } finally {
    revalidatePath(`/todo/${todoID}`);
  }
}

export async function ChangeSubTodoCompleted({
  todoID,
  task,

  parentTodo,
}: {
  todoID: number;
  task: boolean;

  parentTodo: number;
}) {
  try {
    const binaryCompleted = task ? 1 : 0;

    await query(
      `UPDATE subTodos SET completed = ? WHERE id = ? AND todoID = ?`,
      [binaryCompleted, todoID, parentTodo]
    );

    return {
      type: "success",
      message: "Successfully Changed Completed",
    };
  } catch (e) {
    return {
      type: "error",
      message: `Error Changing Completed||${e}`,
    };
  } finally {
    revalidatePath(`/todo/${todoID}`);
    revalidatePath(`/todo/${todoID}/`);
  }
}

export async function ChangeSubTodoPublic({
  todoID,
  task,

  parentTodo,
}: {
  todoID: number;
  task: boolean;

  parentTodo: number;
}) {
  try {
    const binaryCompleted = task ? 1 : 0;

    await query(`UPDATE subTodos SET public = ? WHERE id = ? AND todoID = ?`, [
      binaryCompleted,
      todoID,
      parentTodo,
    ]);

    return {
      type: "success",
      message: "Successfully Changed Visibility",
    };
  } catch (e) {
    return {
      type: "error",
      message: `Error Changing Visibility||${e}`,
    };
  } finally {
    revalidatePath(`/todo/${todoID}`);
    revalidatePath(`/todo/${todoID}/`);
  }
}
