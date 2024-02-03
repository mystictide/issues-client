"use server";

import { getRole } from "@/actions/fetch/actions";
import { readCookie } from "@/assets/js/helpers";
import RoleManager from "@/components/client/managers/roleManager";
import Filter from "@/components/server/layout/filters/projectsFilter";
import Header from "@/components/server/layout/header";
import { cookies } from "next/headers";

export default async function ManageRole({ params }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  const role = await getRole(params?.id);

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row">
        <Filter />
        <div className="content flex-column padding">
          <div className="flex-column">
            <RoleManager admin={admin} user={user} data={role} />
          </div>
        </div>
      </div>
    </>
  );
}
