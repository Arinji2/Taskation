import { Form } from "./form";

export default function Page() {
  return (
    <section className="w-full  min-h-[100svh] flex flex-col items-center justify-start md:py-10 bg-gray-400">
      <section className="max-w-[1280px] w-full flex-col items-center justify-start flex gap-16 xl:gap-32">
        <h1 className="md:text-5xl text-4xl xl:text-6xl font-bold text-black">
          CREATE NEW TODO
        </h1>

        <Form />
      </section>
    </section>
  );
}
