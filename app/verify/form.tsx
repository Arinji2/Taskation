"use client";
import { VerifyAction } from "@/lib/actions/checkVerify";
import { experimental_useFormState as useFormState } from "react-dom";
import { ToastComponent } from "../toastComp";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Form({ code, email }: { code: string; email: string }) {
  const router = useRouter();

  const initialState = {
    type: "success" as "success" | "loading" | "error",
    message: "",
    email: email,
  };

  const [state, formAction] = useFormState(VerifyAction, initialState);

  useEffect(() => {
    if (state.type === "success") router.push("/dash");
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-[200px] h-full flex flex-col items-center justify-center gap-6"
    >
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="name" className="text-xl text-black font-bold">
          Code
        </label>
        <input
          maxLength={6}
          className="w-full h-10 px-2 text-center rounded-md outline-1 bg-gray-200 outline-black border-4 border-black font-medium"
          type="text"
          name="code"
          id="code"
          defaultValue={code ?? ""}
          placeholder={"Code"}
          required
        />
      </div>
      <button
        disabled={code.length !== 6}
        type="submit"
        className="w-[150px] h-[50px] text-lg flex gap-2 flex-row items-center justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
      >
        <p>Verify Code</p>
      </button>
      <ToastComponent
        message={state.message}
        type={state.type as "success" | "error"}
      />
    </form>
  );
}
