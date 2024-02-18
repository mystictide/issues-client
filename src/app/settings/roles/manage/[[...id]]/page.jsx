"use server";

import { getRole } from "@/actions/fetch/actions";
import { readCookie } from "@/assets/js/helpers";
import RoleManager from "@/components/client/managers/roleManager";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageRole({ params }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  if (user && !user.Role.Attributes.some((r) => [1].includes(r))) {
    redirect("/");
  }

  let role;
  if (params?.id && params?.id > 0) {
    role = await getRole({
      ID: params?.id,
      token: admin?.Token ?? user?.Token,
    });
  }

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row v-center">
        <div className="content flex-column">
          <div className="flex-column">
            <RoleManager admin={admin} user={user} data={role} />
          </div>
        </div>
      </div>
    </>
  );
}
