"use server";

import { readCookie } from "@/assets/js/helpers";
import SetTheme from "@/components/client/ui/setTheme";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const settings = await readCookie(cookieStore, "settings");
  const theme = settings?.theme ? settings?.theme : "light";

  return (
    <div>
      <footer className="theme">
        <SetTheme theme={theme} />
      </footer>
    </div>
  );
}
