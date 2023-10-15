import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center bg-slate-400 gap-5">
      <h1 className="font-bold text-black md:text-6xl text-4xl">
        Page, Not Found
      </h1>

      <Link
        href="/login"
        className="text-black text-2xl font-medium border-b-2 border-black"
      >
        Back to Login
      </Link>
    </div>
  );
}
