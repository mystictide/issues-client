"use server";

import { filterProjects } from "@/actions/filters/actions";
import Empty from "@/assets/img/empty.png";
import { buildFilter, readCookie } from "@/assets/js/helpers";
import ProjectsFilter from "@/components/server/layout/filters/projectsFilter";
import ProjectsList from "@/components/server/layout/lists/projectsList";
import Header from "@/components/server/ui/header";

import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BsPlusSquareFill } from "react-icons/bs";

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
    isActive: searchParams.isActive,
    token: admin?.Token ?? user?.Token,
  });

  const projects = await filterProjects(filter);

  return (
    <>
      <Header page={"projects"}/>
      <div className="content-wrapper flex-row">
        <section>
          <div className="manage flex-row flex-center">
            <a
              className="w-full h-full flex-row flex-center no-select manage"
              aria-label="add new project"
              href="/projects/manage/"
            >
              <BsPlusSquareFill />
              <h1>New Project</h1>
            </a>
          </div>
          <ProjectsFilter filter={filter} />
        </section>
        <div className="content flex-column">
          <div className="flex-column">
            {projects?.data?.length > 0 ? (
              <>
                <ProjectsList admin={admin} user={user} projects={projects} />
              </>
            ) : (
              <div className="flex-column flex-center no-select">
                <Image alt="nothing found" src={Empty}></Image>
                <h3>
                  No projects found.{" "}
                  <a
                    className="interactive"
                    aria-label="add new project"
                    href="/projects/manage/"
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
