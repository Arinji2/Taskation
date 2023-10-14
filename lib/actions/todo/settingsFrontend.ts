"use client";

import toast from "react-hot-toast";

type Props = {
  id: number;
  userID: number;
  parentTodo?: number;
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
  props: Props;
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
    parentTodo: props.parentTodo,
  });
  if (res.type === "error") return toast.error(res.message);
  else toast.success(res.message);
  setLoading(false);
}
