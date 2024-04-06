"use client";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-[300px] h-[70px] text-xl flex gap-2 flex-row items-center justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
    >
      {pending && <Loader2 className="animate-spin" />} <p>Submit Form</p>
    </button>
  );
}
