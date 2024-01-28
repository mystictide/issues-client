"use server";

import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");

  if (!user) {
    redirect("/account");
  }

  return <div>main</div>;
}
