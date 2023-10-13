import { getTodos } from "@/lib/todoFunctions";
import { getUserData } from "@/lib/userFunctions";
import { CreateTodoComponent, TodoComponent } from "./todos";
import { TodoInput, TodoProps } from "@/lib/types";

export default async function Page() {
  const user = await getUserData();
  const todos = await getTodos();

  return (
    <section className="w-full  min-h-[100svh] flex flex-col items-center justify-start md:py-10 bg-gray-400">
      <section className="max-w-[1280px] w-full flex-col items-center justify-start flex gap-4 md:gap-16 xl:gap-32">
        <h1 className="md:text-6xl text-4xl xl:text-7xl font-bold text-black pt-10">
          DASHBOARD
        </h1>
        <section className="w-full h-fit flex flex-wrap flex-row items-center justify-center gap-2 md:gap-6">
          <CreateTodoComponent />
          {todos.hasTodos &&
            todos.todos?.map((todo) => (
              <TodoComponent TodoProps={todo} key={todo.id} />
            ))}{" "}
        </section>
      </section>
    </section>
  );
}
