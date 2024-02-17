"use server";

import { filterRoles } from "@/actions/filters/actions";
import Empty from "@/assets/img/empty.png";
import { buildFilter, readCookie } from "@/assets/js/helpers";
import RolesFilter from "@/components/server/layout/filters/rolesFilter";
import RolesList from "@/components/server/layout/lists/rolesList";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BsPlusSquareFill } from "react-icons/bs";

export default async function Roles({ searchParams }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  if (!user.Role.Attributes.some((r) => [1].includes(r))) {
    redirect("/");
  }

  const filter = buildFilter({
    keyword: searchParams.keyword,
    page: searchParams.page,
    sortby: searchParams.sortby,
    token: admin?.Token ?? user?.Token,
  });

  const roles = await filterRoles(filter);

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row">
        <section>
          <div className="manage flex-row flex-center">
            <a
              className="w-full h-full flex-row flex-center no-select manage"
              aria-label="add new role"
              href="/settings/roles/manage/"
            >
              <BsPlusSquareFill />
              <h1>New Role</h1>
            </a>
          </div>
          <RolesFilter filter={filter} />
        </section>
        <div className="content flex-column">
          <div className="flex-column">
            {roles?.data?.length > 0 ? (
              <>
                <RolesList admin={admin} user={user} roles={roles} />
              </>
            ) : (
              <div className="flex-column flex-center no-select">
                <Image alt="nothing found" src={Empty}></Image>
                <h3>
                  No roles found.{" "}
                  <a
                    className="interactive"
                    aria-label="add new role"
                    href="/settings/roles/manage/"
                  >
                    Add a new one?
                  </a>
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
