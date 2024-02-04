"use server";

import { readCookie } from "@/assets/js/helpers";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Main() {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
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
