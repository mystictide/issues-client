"use server";

import { readCookie } from "@/assets/js/helpers";
import Header from "@/components/server/layout/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Main() {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!user || !admin) {
    redirect("/account");
  }

  return (
    <>
      <Header page={"dashboard"} />
      <div className="content-wrapper">
        <div className="content">main</div>
      </div>
    </>
  );
}