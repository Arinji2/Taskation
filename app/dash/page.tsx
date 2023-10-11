import { getUserData } from "@/lib/userFunctions";

export default async function Page() {
  const user = await getUserData();
  console.log(user);

  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center">
      <p className="text-3xl font-bold text-black">DASHBOARD</p>
    </div>
  );
}
