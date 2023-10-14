import { getTodo } from "@/lib/todoFunctions";
import { Form } from "./form";
import { getUserData } from "@/lib/userFunctions";

export default async function Page({ params }: { params: { id: string } }) {
  const todo = await getTodo({
    todoID: params.id,
  });

  const user = await getUserData();
  if (todo.todos.userID !== user.id) throw new Error("Unauthorized");

  return (
    <section className="w-full  min-h-[100svh] flex flex-col items-center justify-start md:py-10 bg-gray-400">
      <section className="max-w-[1280px] w-full flex-col items-center justify-start flex gap-8 md:gap-16 xl:gap-32">
        <div className="h-fit w-full flex flex-col items-center justify-start gap-5">
          <h1 className="md:text-5xl text-3xl xl:text-6xl font-bold text-black pt-10 md:pt-0">
            CREATE NEW TODO FOR
          </h1>
          <h1 className="md:text-4xl text-2xl xl:text-5xl font-medium text-slate-700 pt-10 md:pt-0">
            {todo.todos.name}
          </h1>
        </div>

        <Form todoID={todo.todos.id} />
      </section>
    </section>
  );
}
