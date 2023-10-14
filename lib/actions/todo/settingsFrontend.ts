"use client";

import toast from "react-hot-toast";

type TodoProps = {
  id: number;
  userID: number;
};
type SubTodoProps = {
  id: number;
  todoID: number;
};

export async function ManageSettings({
  isOwner,
  loading,
  setLoading,
  task,
  setTask,
  action,
  props,
}: {
  isOwner: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  task: boolean;
  setTask: React.Dispatch<React.SetStateAction<boolean>>;
  action: Function;
  props: TodoProps;
}) {
  if (!isOwner) return;
  if (loading)
    return toast.error("Please wait for the previous action to complete");
  setLoading(true);
  setTask(task);
  const res = await action({
    todoID: props.id,
    task: task,
    userID: props.userID,
  });
  if (res.type === "error") return toast.error(res.message);
  else toast.success(res.message);
  setLoading(false);
}

export async function ManageSubTodoSettings({
  isOwner,
  loading,
  setLoading,
  task,
  setTask,
  action,
  props,
}: {
  isOwner: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  task: boolean;
  setTask: React.Dispatch<React.SetStateAction<boolean>>;
  action: Function;
  props: SubTodoProps;
}) {
  if (!isOwner) return;
  if (loading)
    return toast.error("Please wait for the previous action to complete");
  setLoading(true);
  setTask(task);
  const res = await action({
    todoID: props.id,
    task: task,

    parentTodo: props.todoID,
  });
  if (res.type === "error") return toast.error(res.message);
  else toast.success(res.message);
  setLoading(false);
}
