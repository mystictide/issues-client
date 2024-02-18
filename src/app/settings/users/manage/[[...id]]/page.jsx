"use server";

import { getRoles, getUser } from "@/actions/fetch/actions";
import { readCookie } from "@/assets/js/helpers";
import UserManager from "@/components/client/managers/userManager";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageUser({ params }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  if (user && !user.Role.Attributes.some((r) => [1, 2].includes(r))) {
    redirect("/");
  }

  let userData;
  if (params?.id && params?.id > 0) {
    userData = await getUser({
      ID: params?.id,
      token: admin?.Token ?? user?.Token,
    });
  }

  const roles = await getRoles(admin?.Token ?? user?.Token);

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row v-center">
        <div className="content flex-column">
          <div className="flex-column">
            {roles[0]?.ID ? (
              <UserManager
                admin={admin}
                user={user}
                data={userData}
                roles={roles}
              />
            ) : (
              <div className="flex-column flex-center">
                <h1>No user roles defined</h1>
                <a
                  className="interactive"
                  aria-label="add new project"
                  href="/settings/roles/manage"
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
