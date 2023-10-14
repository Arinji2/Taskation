"use client";
import { TodoProps } from "@/lib/types";
import { useState } from "react";
import { experimental_useFormState as useFormState } from "react-dom";
import { SubmitButton } from "./submit";
import { DeleteTodoAction } from "@/lib/actions/todo/delete";
export function Form({ data }: { data: TodoProps }) {
  const initialState = {
    type: "success",
    message: "",
    id: data.id,
  };

  const [state, formAction] = useFormState(DeleteTodoAction, initialState);
  const [confirmMessage, setConfirmMessage] = useState("");

  return (
    <form
      action={formAction}
      className="w-full xl:w-[70%] scale-90 md:scale-100 h-full flex flex-col items-center justify-center gap-4 bg-slate-300 rounded-md border-4 shadow-[4px_4px_0_#000] p-4 border-black"
    >
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="name" className="text-2xl text-black font-medium">
          Type <span className="font-bold">Delete Todo</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={confirmMessage}
          maxLength={50}
          minLength={1}
          onChange={(e) => setConfirmMessage(e.target.value)}
          className="w-full max-w-[700px] px-2 h-10 md:ml-5 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium "
        />
      </div>

      <SubmitButton value={confirmMessage} />
    </form>
  );
}
