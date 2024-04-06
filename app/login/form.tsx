"use client";
import { LoginAction } from "@/lib/actions/login";
import PasswordFields from "./password";

import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import SubmitButton from "./submit";
const initialState = {
  type: "success" as "success" | "loading" | "error",
  message: "",
};
export function Form() {
  const router = useRouter();
  const [state, formAction] = useFormState(LoginAction, initialState);

  useToast({
    message: state.message,
    type: state.type,
    successMessage: "Successfully Logged In",
    successRoute: "/dash",
  });

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
