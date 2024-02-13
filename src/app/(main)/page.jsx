"use server";

import { getIssues, getProjects } from "@/actions/fetch/actions";
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

  const projects = await getProjects(admin?.Token ?? user?.Token, 10);
  const issues = await getIssues(admin?.Token ?? user?.Token, 10);

  return (
    <>
      <Header page={"dashboard"} />
      <div className="content-wrapper">
        <div className="content">main</div>
      </div>
    </>
  );
}
