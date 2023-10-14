import { getAllSubTodos, getTodo } from "@/lib/todoFunctions";
import { getUserData } from "@/lib/userFunctions";
import { dateToReadable } from "@/lib/utils";
import { redirect } from "next/navigation";
import Progress from "./progress";
import Public from "./public";
import { CreateTodoComponent, TodoComponent } from "@/app/dash/todos";
import { SubTodoProps } from "@/lib/types";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const todo = await getTodo({ todoID: params.id });

  const user = await getUserData(todo.todos.userID);
  if (todo.todos.public === 0 && todo.todos.userID !== user.id) {
    redirect("404");
  }
  return {
    title: `${user.name} | ${todo.todos.name}`,
    description: todo.todos.description,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const todo = await getTodo({ todoID: params.id });

  const isPublic = todo.todos.public === 1 ? true : false;
  let user = null;
  let isOwner = false;
  let subTodos = await getAllSubTodos({
    todoID: todo.todos.id,
  });
  try {
    user = await getUserData();
    isOwner = user.id === todo.todos.userID;
  } catch (e) {
    user = await getUserData(todo.todos.userID);
    if (!isPublic) {
      redirect("404");
    }
  }

  if (!isOwner && subTodos.hasTodos) {
    subTodos.todos = subTodos.todos!.filter((todo) => todo.public === 1);
  }

  return (
    <section className="w-full min-h-[100svh] flex flex-col items-center justify-center">
      <div className=" w-full h-full flex flex-col items-start justify-start gap-4 max-w-[1280px]">
        <h1 className="md:text-6xl text-4xl xl:text-7xl font-bold text-black pt-10">
          {todo.todos.name}
        </h1>
        <p className="text-2xl text-black font-medium pl-4">
          {todo.todos.description}
        </p>
        <div className="w-[60%] h-[3px] bg-black ml-4"></div>
        <p className="text-2xl text-gray-700 font-medium pl-4">
          By {user?.name}
        </p>
        <p className="text-xl text-gray-700 font-medium pl-4">
          Created: {dateToReadable(todo.todos.created)}
        </p>
        <Progress props={todo.todos} isOwner={isOwner} />
        <Public props={todo.todos} isOwner={isOwner} />

        <section className="w-full h-fit flex flex-wrap flex-row items-center justify-start pl-3 mt-5 gap-2 md:gap-6">
          {isOwner && <CreateTodoComponent subTodo />}
          {subTodos.hasTodos &&
            subTodos.todos?.map((todo) => (
              <TodoComponent TodoProps={todo} subTodo key={todo.id} />
            ))}{" "}
        </section>
      </div>
    </section>
  );
}
