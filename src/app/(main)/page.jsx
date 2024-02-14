"use server";

import { getIssueStats, getProjectStats } from "@/actions/fetch/actions";
import { formatDate, readCookie } from "@/assets/js/helpers";
import Header from "@/components/server/ui/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Main() {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  const projects = await getProjectStats(admin?.Token ?? user?.Token);
  const issues = await getIssueStats(admin?.Token ?? user?.Token);

  console.log(issues);

  return (
    <>
      <Header page={"dashboard"} />
      <div className="content-wrapper smaller">
        <div className="flex-column w-full padding">
          <section className="flex-column w-full padding">
            <h3>Projects</h3>
            <div className="flex-row flex-wrap w-full stats">
              {projects.map((project) => (
                <a
                  key={project.ID}
                  className="bg flex-column box box-project radius"
                  href="/projects"
                >
                  <h4 className="text-center">{project.Name}</h4>
                  <h6 className="text-center">
                    Created - {formatDate(project.CreatedDate)}
                  </h6>
                  <div className="flex-row">
                    <div className="flex-column flex-center">
                      <h5>Open Issues</h5>
                      <h5>{project.OpenIssues}</h5>
                    </div>
                    <div className="flex-column flex-center">
                      <h5>Active Issues</h5>
                      <h5>{project.ActiveIssues}</h5>
                    </div>
                    <div className="flex-column flex-center">
                      <h5>Closed Issues</h5>
                      <h5>{project.ClosedIssues}</h5>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
          <section className="flex-column w-full padding">
            <h3>Issues</h3>
            <div className="flex-row flex-wrap w-full stats">
              <div className="bg flex-column box box-issue radius">
                <h4 className="text-center">1</h4>
                <h5>2</h5>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
