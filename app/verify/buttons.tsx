"use client";

import { sendVerifyEmail } from "@/lib/actions/email/verifyEmail";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export function SendEmailButton({ email, id }: { email: string; id: number }) {
  const [emailRes, setEmailRes] = useState<any>({
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailRes.message.length === 0) return;
    if (emailRes.type === "success") toast.success(emailRes.message);
    else toast.error(emailRes.message);
  }, [emailRes]);
  return (
    <>
      <button
        aria-disabled={loading}
        className="w-[300px] h-[50px]  text-lg flex gap-2 flex-row items-center justify-center bg-slate-300 hover:bg-black text-black hover:text-slate-300 border-4 border-black transition-all ease-in-out duration-300  rounded-md font-bold"
        onClick={async () => {
          setLoading(true);
          const res = await sendVerifyEmail(email, id);
          setEmailRes(res);
          setLoading(false);
        }}
      >
        {loading && <Loader2 className="animate-spin" />} <p>Send Email</p>
      </button>
    </>
  );
}

export function CheckCodeButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending && <Loader2 className="animate-spin" />} <p>Verify Code</p>
    </>
  );
}
