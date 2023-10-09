"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  message?: string;
  type?: "success" | "loading" | "error";
};
export function ToastComponent(props: Props) {
  const router = useRouter();
  useEffect(() => {
    if (props.message) {
      toast[props.type ?? "success"](props.message, {
        style: {
          border: `3px solid ${props.type === "error" ? "#ef4444" : "#10b981"}`,
          boxShadow: `3px 4px 0px ${
            props.type === "error" ? "#ef4444" : "#10b981"
          }`,
          padding: "16px",
          color: "#000",
        },
        iconTheme: {
          primary: `${props.type === "error" ? "#ef4444" : "#10b981"}`,
          secondary: "#FFFAEE",
        },
      });
    }
  }, [props.message, props.type]);

  useEffect(() => {
    if (props.message === "Successfully Registered") router.push("/dash");
  }, [props.message]);
  return (
    <div>
      <Toaster position="top-right" />
    </div>
  );
}
