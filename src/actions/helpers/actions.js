"use server";

import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";

export async function setSettings(data) {
  const cookieStore = cookies();
  let curSettings = readCookie(cookieStore, "settings") ?? null;
  let settings = {
    theme: data?.theme ? data.theme : curSettings?.theme ?? "light",
  };
  cookies().set("settings", JSON.stringify(settings));
}
