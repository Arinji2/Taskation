"use client";
import { Loader2 } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-2">
      <button
        type="submit"
        className="w-full md:w-[300px] md:ml-5 h-[70px] text-xl flex gap-2 flex-row items-center justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
      >
        {pending && <Loader2 className="animate-spin" />} <p>Save Todo</p>
      </button>
    </div>
  );
}
