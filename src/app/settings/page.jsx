"use server";

import { readCookie } from "@/assets/js/helpers";
import Header from "@/components/server/layout/header";
import { cookies } from "next/headers";

export default async function Account() {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");
  const settings = await readCookie(cookieStore, "settings");

  return (
    <>
      <Header page={"settings"} />
      <div className="content-wrapper">
        <div className="content">main</div>
      </div>
    </>
  );
}
