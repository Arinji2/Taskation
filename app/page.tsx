import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-[100svh] flex flex-col items-center justify-center max-w-[1280px] bg-gray-200 gap-10">
      <h1 className="font-bold md:text-6xl text-5xl xl:text-7xl text-black">
        MYSQL-TODO
      </h1>
      <section className="w-full flex md:flex-row items-center justify-center flex-col h-fit gap-2 gap-y-6">
        <Link
          href="/login"
          className="w-full  bg-slate-300 flex flex-col items-center justify-center py-8 p-5 hover:bg-black group transition-all ease-in-out duration-500"
        >
          <h2 className="font-bold text-3xl md:text-5xl group-hover:text-slate-300 transition-all ease-in-out duration-300 text-black">
            LOGIN
          </h2>
        </Link>
        <Link
          href="/join"
          className="w-full  bg-slate-300 flex flex-col items-center justify-center py-8 p-5 hover:bg-black group transition-all ease-in-out duration-500"
        >
          <h2 className="font-bold text-3xl md:text-5xl group-hover:text-slate-300 transition-all ease-in-out duration-300 text-black">
            JOIN
          </h2>
        </Link>
      </section>
    </main>
  );
}
