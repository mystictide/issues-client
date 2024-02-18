"use server";

import { getIssue, getProjects, getUsers } from "@/actions/fetch/actions";
import { readCookie } from "@/assets/js/helpers";
import IssueManager from "@/components/client/managers/issueManager";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageIssue({ params }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  if (user && !user.Role.Attributes.some((r) => [1, 2, 3, 4].includes(r))) {
    redirect("/");
  }

  let issue;
  if (params?.id && params?.id > 0) {
    issue = await getIssue({
      ID: params?.id,
      token: admin?.Token ?? user?.Token,
    });
  }

  const users = await getUsers(admin?.Token ?? user?.Token);
  const projects = await getProjects(admin?.Token ?? user?.Token, "");

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row v-center">
        <div className="content flex-column">
          <div className="flex-column">
            {projects[0]?.ID ? (
              <IssueManager
                admin={admin}
                user={user}
                data={issue}
                users={users}
                projects={projects}
              />
            ) : (
              <div className="flex-column flex-center">
                <h1>No active project found</h1>
                <a
                  className="interactive"
                  aria-label="add new project"
                  href="/projects/manage"
                >
                  Please create a new one here.
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
