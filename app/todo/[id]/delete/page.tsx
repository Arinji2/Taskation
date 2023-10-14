import { getTodo } from "@/lib/todoFunctions";
import { Form } from "./form";

export default async function Page({ params }: { params: { id: string } }) {
  const todo = await getTodo({ todoID: params.id });
  return (
    <section className="w-full  min-h-[100svh] flex flex-col items-center justify-start md:py-10 bg-red-800">
      <section className="max-w-[1280px] w-full flex-col items-center justify-start flex gap-8 md:gap-16 xl:gap-32">
        <h1 className="md:text-4xl text-2xl xl:text-5xl line-clamp-2 font-bold text-white pt-10 md:pt-0">
          Delete {todo.todos.name}
        </h1>

        <Form data={todo.todos} />
      </section>
    </section>
  );
}
