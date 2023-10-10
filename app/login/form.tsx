"use client";
import { LoginAction } from "@/lib/actions/login";
import { ToastComponent } from "../toastComp";
import PasswordFields from "./password";
import SubmitButton from "./submit";

import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const initialState = {
  type: "success" as "success" | "loading" | "error",
  message: "",
};
export function Form() {
  const router = useRouter();
  const [state, formAction] = useFormState(LoginAction, initialState);
  useEffect(() => {
    if (state.message === "") return;
    if (state.type === "success") toast.success(state.message);
    if (state.type === "error") toast.error(state.message);

    if (state.message === "Successfully Logged In") router.push("/dash");

    return () => {
      toast.dismiss();
    };
  }, [state.message, state.type]);

  return (
    <form
      action={formAction}
      className="w-full xl:w-[50%] scale-90 md:scale-100 h-full flex flex-col items-center justify-center gap-4 bg-slate-300 rounded-md border-4 shadow-[4px_4px_0_#000] p-4 border-black"
    >
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="name" className="text-2xl text-black font-bold">
          Username/Email
        </label>
        <input
          className="w-full h-10 px-2 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium"
          type="text"
          name="name"
          id="name"
          placeholder={"example/example@gmail.com"}
          required
        />
      </div>

      <PasswordFields />
      <div className="w-full h-fit flex flex-col items-start justify-center">
        <SubmitButton />
      </div>
    </form>
  );
}
