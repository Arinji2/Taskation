import { getUserId } from "@/lib/getUserID";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");

  const user = await getUserId(cookie!.value);

  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center">
      <p className="text-3xl font-bold text-black">DASHBOARD</p>
    </div>
  );
}
