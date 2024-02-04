"use server";

import { readCookie } from "@/assets/js/helpers";
import Filter from "@/components/server/layout/filters/projectsFilter";
import Menu from "@/components/server/layout/menus/projectsMenu";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Users() {
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
        <Filter />
        <div className="content flex-column">
          <Menu />
          <div className="padding">main</div>
        </div>
      </div>
    </>
  );
}