"use server";

import { filterUsers } from "@/actions/filters/actions";
import Empty from "@/assets/img/empty.png";
import { buildFilter, readCookie } from "@/assets/js/helpers";
import UsersFilter from "@/components/server/layout/filters/usersFilter";
import UsersList from "@/components/server/layout/lists/usersList";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Users({ searchParams }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  const filter = buildFilter({
    keyword: searchParams.keyword,
    page: searchParams.page,
    sortby: searchParams.sortby,
    token: admin?.Token ?? user?.Token,
  });

  const users = await filterUsers(filter);

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row">
        <UsersFilter filter={filter} />
        <div className="content flex-column">
          <div className="flex-column">
            {users?.data?.length > 0 ? (
              <>
                <UsersList admin={admin} user={user} users={users} />
              </>
            ) : (
              <div className="flex-column flex-center no-select">
                <Image alt="nothing found" src={Empty}></Image>
                <h3>
                  No users found.{" "}
                  <a
                    className="interactive"
                    aria-label="add new user"
                    href="/settings/users/manage/"
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
