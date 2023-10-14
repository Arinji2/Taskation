"use client";
import { SubTodoProps, TodoProps } from "@/lib/types";
import { dateToReadable } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CreateTodoComponent({ subTodo }: { subTodo?: boolean }) {
  return (
    <Link
      href="/dash/create"
      className="w-[350px] scale-75 shrink-0 md:scale-90 transition-all ease-in-out duration-300 bg-slate-200 hover:bg-zinc-300 hover:-translate-y-10 h-[400px] shadow-[2px_4px_0_#000] border-4 border-black rounded-sm flex flex-col items-center justify-center gap-10"
    >
      <PlusCircle className="text-black w-[100px] h-[100px]" />
      <p className="text-black text-3xl font-medium">
        Create a {subTodo ? "Sub Todo" : "Todo"}
      </p>
    </Link>
  );
}

type TodoComponentProps = {
  id: number;
  name: string;
  description: string;
  public: number;
  completed: number;
  created: Date;
  userID?: number;
  todoID?: number;
};

export function TodoComponent({
  TodoProps,
  subTodo,
}: {
  TodoProps: TodoComponentProps;
  subTodo?: boolean;
}) {
  const [completed, setCompleted] = useState(
    TodoProps.completed === 1 ? true : false
  );
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [todoPublic, setTodoPublic] = useState(
    TodoProps.public === 1 ? true : false
  );
  const [loadingTodoPublic, setLoadingTodoPublic] = useState(false);

  return (
    <div className="w-[350px] scale-75 shrink-0 md:scale-90 transition-all ease-in-out duration-300 bg-slate-200 hover:bg-zinc-300 h-[400px] shadow-[2px_4px_0_#000] border-4 border-black rounded-sm flex flex-col items-center justify-center gap-10">
      <div className="w-full h-full flex flex-col items-start justify-start p-4 gap-2">
        <div className="w-full h-[100px] flex flex-col items-start gap-2 justify-center">
          <p className="text-black text-4xl font-semibold line-clamp-2">
            {TodoProps.name}
          </p>
          <div className="w-[90%] bg-black h-[2px]"></div>
        </div>
        <div className="w-full h-[140px] flex flex-col items-start gap-2 justify-start">
          <p className="text-black text-xl font-medium line-clamp-4">
            {TodoProps.description}
          </p>
        </div>
        <div className="w-full h-fit flex flex-col items-start gap-2 justify-start">
          <p className="text-black text-lg font-medium line-clamp-5">
            Created: {dateToReadable(TodoProps.created)}
          </p>
        </div>
        <div className="w-full h-[70px] flex flex-row items-end gap-2 justify-center">
          <div className="w-full h-full flex flex-col items-start justify-center gap-1">
            <div className="w-full h-fit flex flex-row items-center justify-start gap-1">
              <p className="text-black text-lg font-medium line-clamp-5">
                Completed{" "}
              </p>
              {loadingCompleted && (
                <Loader2 className="animate-spin h-[13px] w-[13px]" />
              )}
            </div>
            <button
              onClick={() => {
                setLoadingCompleted(true);
                setCompleted(!completed);
                setTimeout(() => {
                  setLoadingCompleted(false);
                }, 3000);
              }}
              className="w-[40px] h-[20px] rounded-3xl border-2 border-black relative overflow-hidden"
            >
              <div
                className={`${
                  completed
                    ? "translate-x-full bg-green-500 "
                    : "translate-x-0 bg-red-500 "
                } w-[20px] rounded-3xl h-full transition-transform ease-in-out duration-300 `}
              ></div>
            </button>
          </div>
          <div className="w-full h-full flex flex-col items-start justify-center gap-1">
            <div className="w-full h-fit flex flex-row items-center justify-start gap-1">
              <p className="text-black text-lg font-medium line-clamp-5">
                Public{" "}
              </p>
              {loadingTodoPublic && (
                <Loader2 className="animate-spin h-[13px] w-[13px]" />
              )}
            </div>
            <button
              onClick={() => {
                setLoadingTodoPublic(true);
                setTodoPublic(!todoPublic);
                setTimeout(() => {
                  setLoadingTodoPublic(false);
                }, 3000);
              }}
              className="w-[40px] h-[20px] rounded-3xl border-2 border-black relative overflow-hidden"
            >
              <div
                className={`${
                  todoPublic
                    ? "translate-x-full bg-green-500 "
                    : "translate-x-0 bg-red-500 "
                } w-[20px] rounded-3xl h-full transition-transform ease-in-out duration-300 `}
              ></div>
            </button>
          </div>
        </div>
        <Link
          href={
            subTodo
              ? `/todo/${TodoProps.todoID}/${TodoProps.id}`
              : `/todo/${TodoProps.id}`
          }
          type="submit"
          className="w-[70%] h-[30px] text-sm flex gap-2 flex-col items-start p-4 justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
        >
          <p>View Todo</p>
        </Link>
      </div>
    </div>
  );
}
