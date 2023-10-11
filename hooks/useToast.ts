"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function useToast({
  type,
  message,
  successMessage,
  successRoute,
}: {
  type: string;
  message: string;
  successMessage?: string;
  successRoute?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    if (message === "") return;
    if (type === "success")
      toast.success(message, {
        style: {
          border: `3px solid #10b981`,
          boxShadow: `3px 4px 0px 
         #10b981
        `,
          padding: "16px",
          color: "#000",
        },
        iconTheme: {
          primary: `#10b981`,
          secondary: "#FFFAEE",
        },
      });
    if (type === "error")
      toast.error(message, {
        style: {
          border: `3px solid #ef4444`,
          boxShadow: `3px 4px 0px 
         #ef4444
        `,
          padding: "16px",
          color: "#000",
        },
        iconTheme: {
          primary: `#ef4444`,
          secondary: "#FFFAEE",
        },
      });

    if (successMessage && successRoute)
      if (message === successMessage) router.push(successRoute);

    return () => {
      toast.dismiss();
    };
  }, [message, type, router, successMessage, successRoute]);
}
