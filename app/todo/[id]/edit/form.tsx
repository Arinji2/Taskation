"use client";
import { useToast } from "@/hooks/useToast";
import { EditTodoAction } from "@/lib/actions/todo/edit";
import { TodoProps } from "@/lib/types";
import { experimental_useFormState as useFormState } from "react-dom";
import { SubmitButton } from "./submit";
export function Form({ data }: { data: TodoProps }) {
  const initialState = {
    type: "success",
    message: "",
    id: data.id,
  };

  const [state, formAction] = useFormState(EditTodoAction, initialState);

  useToast({
    message: state.message,
    type: state.type,
    successMessage: "Successfully Edited Todo",
    successRoute: `/todo/${data.id}`,
  });

  return (
    <form
      action={formAction}
      className="w-full xl:w-[70%] scale-90 md:scale-100 h-full flex flex-col items-center justify-center gap-4 bg-slate-300 rounded-md border-4 shadow-[4px_4px_0_#000] p-4 border-black"
    >
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="name" className="text-2xl text-black font-bold">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={data.name}
          required
          maxLength={50}
          minLength={1}
          className="w-full max-w-[700px] px-2 h-10 md:ml-5 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium "
        />
      </div>
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="name" className="text-2xl text-black font-bold">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          defaultValue={data.description}
          maxLength={100}
          minLength={10}
          className="w-full max-w-[700px] px-2 py-2 h-20 md:ml-5 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium "
        />
      </div>
      <SubmitButton />
    </form>
  );
}
