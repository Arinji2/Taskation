import { query } from "@/lib/query";
import { Form } from "./form";

export default async function Page() {
  return (
    <main className="w-full h-full min-h-[100svh] flex flex-col items-center justify-center">
      <section className="w-full h-full flex flex-col items-center justify-center max-w-[1280px] gap-10">
        <h1 className="font-bold text-5xl group-hover:text-slate-300 transition-all ease-in-out duration-300 text-black ">
          JOIN
        </h1>
        <Form />
      </section>
    </main>
  );
}
