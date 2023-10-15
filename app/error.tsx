"use client";

import Link from "next/link";

export default function Page({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center bg-red-800 gap-5">
      <h1 className="font-bold text-white md:text-6xl text-4xl">ERROR</h1>

      <p className="text-white text-2xl font-medium">{error.message}</p>
      <p className="bg-black border-4 shadow-[4px_4px_0_#000] text-white py-2 px-6 border-black text-lg">
        Error Code: {error.digest}
      </p>
      <Link
        href="/login"
        className="text-white text-2xl font-medium border-b-2 border-white"
      >
        Back to Login
      </Link>
    </div>
  );
}
