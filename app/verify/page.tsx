import { cookies } from "next/headers";
import { getUserId } from "@/lib/getUserID";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SendEmailButton } from "./buttons";
import Form from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: { [code: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value!;
  const user = await getUserId(token);

  if (user.email.length === 0) redirect("/login");
  return (
    <main className="w-full h-full min-h-[100svh] flex flex-col items-center justify-center">
      <section className="w-full h-full flex flex-col items-center justify-center max-w-[1280px] gap-10">
        <h1 className="font-bold text-5xl group-hover:text-slate-300 transition-all ease-in-out duration-300 text-black ">
          VERIFY EMAIL
        </h1>
        <div className="w-full h-fit flex flex-row items-center justify-center font-medium text-black gap-2">
          <p>Current Email:</p>
          <p className="border-b-4 border-slate-300 pt-1">{user.email}</p>
          <p>,</p>
          <Link
            href="/login"
            className="font-bold border-b-4 border-black pt-1"
          >
            Not you? Login
          </Link>
        </div>
        <SendEmailButton email={user.email} id={user.id} />
        <Form code={searchParams.code ?? ""} email={user.email} />
      </section>
    </main>
  );
}
