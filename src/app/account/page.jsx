"use server";

import { readCookie } from "@/assets/js/helpers";
import SetTheme from "@/components/client/ui/setTheme";
import AuthClient from "@/components/client/user/accounts/authClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Account() {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");
  const settings = await readCookie(cookieStore, "settings");
  const theme = settings?.theme ? settings?.theme : "light";

  if (user || admin) {
    redirect("/");
  }

  return (
    <div className="content-wrapper flex-column flex-center">
      <AuthClient />
      <SetTheme theme={theme} />
    </div>
  );
}
