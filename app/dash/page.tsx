import { getUserId } from "@/lib/getUserID";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");

  const user = await getUserId(cookie!.value);

  return <div></div>;
}
