"use client";
import { Loader2 } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
export function SubmitButton({ value }: { value: string }) {
  const { pending } = useFormStatus();
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-2">
      <button
        disabled={value !== "Delete Todo"}
        type="submit"
        className="w-full md:w-[300px] md:ml-5 h-[70px] text-xl flex gap-2 flex-row items-center justify-center disabled:bg-slate-500 disabled:text-black bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
      >
        {pending && <Loader2 className="animate-spin" />} <p>Delete Todo</p>
      </button>
    </div>
  );
}
