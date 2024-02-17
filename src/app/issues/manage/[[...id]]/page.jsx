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

  if (!user.Role.Attributes.some((r) => [1, 2, 3, 4].includes(r))) {
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
            {users[0]?.ID && projects[0]?.ID ? (
              <IssueManager
                admin={admin}
                user={user}
                data={issue}
                users={users}
                projects={projects}
              />
            ) : (
              <div className="flex-column flex-center">
                <h1>404</h1>
                <h3>Could not connect the server. Please try again.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
