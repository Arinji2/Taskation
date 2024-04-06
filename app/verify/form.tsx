"use client";
import { useToast } from "@/hooks/useToast";
import { VerifyAction } from "@/lib/actions/checkVerify";
import { useState } from "react";
import { useFormState } from "react-dom";
import { CheckCodeButton } from "./buttons";
export default function Form({ code, email }: { code: string; email: string }) {
  const [codeState, setCodeState] = useState(code ?? "");

  const initialState = {
    type: "success" as "success" | "loading" | "error",
    message: "",
    email: email,
  };

  const [state, formAction] = useFormState(VerifyAction, initialState);

  useToast({
    message: state.message,
    type: state.type,
    successMessage: "Successfully Verified",
    successRoute: "/dash",
  });
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
          placeholder={"Code"}
          required
          value={codeState}
          onChange={(e) => {
            setCodeState(e.target.value);
          }}
        />
      </div>
      <button
        disabled={codeState.length !== 6}
        type="submit"
        className="w-[180px] h-[50px] text-lg flex gap-2 flex-row items-center justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
      >
        <CheckCodeButton />
      </button>
    </form>
  );
}
