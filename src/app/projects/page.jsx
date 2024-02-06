"use server";

import { readCookie } from "@/assets/js/helpers";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Projects() {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row">
        {/* <Filter /> */}
        <div className="content flex-column">
          <div className="padding">main</div>
        </div>
      </div>
    </>
  );
}
