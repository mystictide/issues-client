"use server";

import { getProject, getUsers } from "@/actions/fetch/actions";
import { readCookie } from "@/assets/js/helpers";
import ProjectManager from "@/components/client/managers/projectManager";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageProject({ params }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  if (user && !user.Role.Attributes.some((r) => [1, 2, 3].includes(r))) {
    redirect("/");
  }

  let project;
  if (params?.id && params?.id > 0) {
    project = await getProject({
      ID: params?.id,
      token: admin?.Token ?? user?.Token,
    });
  }

  const users = await getUsers(admin?.Token ?? user?.Token);

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row v-center">
        <div className="content flex-column">
          <div className="flex-column">
            <ProjectManager
              admin={admin}
              user={user}
              data={project}
              users={users}
            />
          </div>
        </div>
      </div>
    </>
  );
}
