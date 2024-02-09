"use server";

import { getProjects } from "@/actions/fetch/actions";
import { filterIssues } from "@/actions/filters/actions";
import Empty from "@/assets/img/empty.png";
import { buildIssueFilter, readCookie } from "@/assets/js/helpers";
import IssuesFilter from "@/components/server/layout/filters/issuesFilter";
import IssuesList from "@/components/server/layout/lists/issuesList";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BsPlusSquareFill } from "react-icons/bs";

export default async function Issues({ searchParams }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  const filter = buildIssueFilter({
    keyword: searchParams.keyword,
    projectid: searchParams.projectid,
    type: searchParams.type,
    status: searchParams.status,
    priority: searchParams.priority,
    page: searchParams.page,
    sortby: searchParams.sortby,
    isActive: searchParams.isActive,
    token: admin?.Token ?? user?.Token,
  });

  const issues = await filterIssues(filter);
  const projects = await getProjects(admin?.Token ?? user?.Token);

  return (
    <>
      <Header />
      <div className="content-wrapper flex-row">
        <section>
          <div className="manage flex-row flex-center">
            <a
              className="w-full h-full flex-row flex-center no-select manage"
              aria-label="add new issue"
              href="/issues/manage/"
            >
              <BsPlusSquareFill />
              <h1>New Issue</h1>
            </a>
          </div>
          <IssuesFilter filter={filter} projects={projects} />
        </section>
        <div className="content flex-column">
          <div className="flex-column">
            {issues?.data?.length > 0 ? (
              <>
                <IssuesList admin={admin} user={user} issues={issues} />
              </>
            ) : (
              <div className="flex-column flex-center no-select">
                <Image alt="nothing found" src={Empty}></Image>
                <h3>
                  No issues found.{" "}
                  <a
                    className="interactive"
                    aria-label="add new issue"
                    href="/issues/manage/"
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
