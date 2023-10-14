"use client";
import { ChangePublic, ChangeSubTodoPublic } from "@/lib/actions/todo/settings";
import { ManageSubTodoSettings } from "@/lib/actions/todo/settingsFrontend";
import { SubTodoProps } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Public({
  props,
  isOwner,
}: {
  props: SubTodoProps;
  isOwner: boolean;
}) {
  const [todoPublic, setTodoPublic] = useState(
    props.public === 1 ? true : false
  );
  const [loadingTodoPublic, setLoadingTodoPublic] = useState(false);
  return (
    <div className="w-full h-full flex flex-col items-center md:items-start justify-center gap-1 md:pl-5">
      <div className="w-full h-fit flex flex-row items-center justify-center md:justify-start gap-1">
        <p className="text-black text-lg font-medium line-clamp-5">Public </p>
        {loadingTodoPublic && (
          <Loader2 className="animate-spin h-[13px] w-[13px]" />
        )}
      </div>
      <button
        disabled={!isOwner}
        onClick={async () => {
          await ManageSubTodoSettings({
            isOwner,
            props,
            loading: loadingTodoPublic,
            setLoading: setLoadingTodoPublic,
            action: ChangeSubTodoPublic,
            task: !todoPublic,
            setTask: setTodoPublic,
          });
        }}
        className="w-[50px] h-[30px] rounded-3xl border-2 border-black relative overflow-hidden"
      >
        <div
          className={`${
            todoPublic
              ? "translate-x-full bg-green-500 "
              : "translate-x-0 bg-red-500 "
          } w-[25px] rounded-3xl h-full transition-transform ease-in-out duration-300 `}
        ></div>
      </button>
    </div>
  );
}
