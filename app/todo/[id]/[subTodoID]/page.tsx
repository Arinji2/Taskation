import { getAllSubTodos, getSubTodo, getTodo } from "@/lib/todoFunctions";
import { getUserData } from "@/lib/userFunctions";
import { dateToReadable } from "@/lib/utils";
import { redirect } from "next/navigation";
import Progress from "./progress";
import Public from "./public";
import { CreateTodoComponent, TodoComponent } from "@/app/dash/todos";
import { SubTodoProps, User } from "@/lib/types";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { subTodoID: string };
}) {
  const todo = await getSubTodo({ todoID: params.subTodoID });
  const parentTodo = await getTodo({
    todoID: todo.todos.todoID.toString(),
  });
  const user = await getUserData(parentTodo.todos.userID);
  if (todo.todos.public === 0 && parentTodo.todos.userID !== user.id) {
    redirect("404");
  }
  return {
    title: `${user.name} | ${todo.todos.name}`,
    description: todo.todos.description,
  };
}

export default async function Page({
  params,
}: {
  params: { subTodoID: string };
}) {
  const todo = await getSubTodo({ todoID: params.subTodoID });
  const parentTodo = await getTodo({ todoID: todo.todos.todoID.toString() });

  const isPublic = todo.todos.public === 1 ? true : false;
  let user = null as User | null;
  let isOwner = false;

  try {
    user = (await getUserData()) as User;
    isOwner = user.id === parentTodo.todos.userID;
  } catch (e) {
    user = (await getUserData(parentTodo.todos.userID)) as User;
    if (!isPublic) {
      redirect("404");
    }
  }
  const showBack = isOwner || parentTodo.todos.public === 1;
  return (
    <section className="w-full min-h-[100svh] flex flex-col items-center justify-center">
      <div className=" w-[95%] h-full flex flex-col items-center md:items-start justify-start gap-6 md:gap-4 max-w-[1280px] pb-5">
        <h1 className="md:text-6xl text-4xl xl:text-7xl font-bold text-black pt-10">
          {todo.todos.name}
        </h1>
        <p className="text-2xl text-black font-medium text-center md:pl-4">
          {todo.todos.description}
        </p>
        <div className="w-[60%] h-[3px] bg-black text-center md:ml-4"></div>
        <p className="text-2xl text-gray-700 font-medium text-center md:pl-4">
          By {user?.name}
        </p>
        <p className="text-xl text-gray-700 font-medium text-center md:pl-4">
          Created: {dateToReadable(todo.todos.created)}
        </p>
        <div className="w-full h-fit flex md:flex-col flex-row items-center justify-center gap-5">
          <Progress props={todo.todos} isOwner={isOwner} />
          <Public props={todo.todos} isOwner={isOwner} />
        </div>
        {showBack && (
          <Link
            href={`/todo/${parentTodo.todos.id}`}
            className="text-lg line-clamp-1 text-gray-700 font-medium text-center md:ml-4 border-b-2 border-black"
          >
            Go back to {parentTodo.todos.name}
          </Link>
        )}
        {isOwner && (
          <Link
            href={`/todo/${parentTodo.todos.id}/${todo.todos.id}/edit`}
            className="w-fit md:ml-5 h-fit px-6 py-2 text-xl flex gap-2 flex-row items-center justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
          >
            <p>Edit Todo</p>
          </Link>
        )}
        {isOwner && (
          <Link
            href={`/todo/${parentTodo.todos.id}/${todo.todos.id}/delete`}
            className="w-fit md:ml-5 h-fit px-6 py-2 text-xl flex gap-2 flex-row items-center justify-center bg-red-500 hover:bg-red-600 text-white border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
          >
            <p>Delete Todo</p>
          </Link>
        )}
      </div>
    </section>
  );
}
