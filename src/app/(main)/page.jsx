"use server";

import {
  getComments,
  getIssueStats,
  getIssues,
  getProjectStats,
} from "@/actions/fetch/actions";
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
  const issueStats = await getIssueStats(admin?.Token ?? user?.Token);
  const issues = await getIssues(admin?.Token ?? user?.Token, 10);
  const comments = await getComments(admin?.Token ?? user?.Token, 10);

  return (
    <>
      <Header page={"dashboard"} />
      <div className="content-wrapper smaller">
        <div className="flex-column w-full padding">
          <section className="flex-column w-full padding">
            <h3>Projects Overview</h3>
            <div className="flex-row flex-wrap w-full stats">
              {projects?.length > 0 && projects[0].ID ? (
                <>
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
                </>
              ) : (
                <h5>
                  No projects available yet.{" "}
                  <a
                    className="interactive"
                    aria-label="add new project"
                    href="/projects/manage"
                  >
                    Create a new one here.
                  </a>
                </h5>
              )}
            </div>
          </section>
          <section className="flex-column w-full padding">
            <h3>Issues Overview</h3>
            <div className="flex-row flex-wrap w-full stats">
              <a
                className="bg flex-column box box-issue radius"
                href="/issues?type=1"
              >
                <div className="flex-column flex-center">
                  <h5>Bugs</h5>
                  <h5>{issueStats.BugsCount ?? "0"}</h5>
                </div>
              </a>
              <a
                className="bg flex-column box box-issue radius"
                href="/issues?type=2"
              >
                <div className="flex-column flex-center">
                  <h5>Features</h5>
                  <h5>{issueStats.FeaturesCount ?? "0"}</h5>
                </div>
              </a>
              <a
                className="bg flex-column box box-issue radius"
                href="/issues?type=3"
              >
                <div className="flex-column flex-center">
                  <h5>Enhancements</h5>
                  <h5>{issueStats.EnhancementsCount ?? "0"}</h5>
                </div>
              </a>
              <a
                className="bg flex-column box box-issue radius"
                href="/issues?type=4"
              >
                <div className="flex-column flex-center">
                  <h5>Tasks</h5>
                  <h5>{issueStats.TasksCount ?? "0"}</h5>
                </div>
              </a>
            </div>
          </section>
          <section className="flex-row w-full padding">
            <div className="flex-column w-half">
              <h3>Latest Issues</h3>
              <div className="flex-column flex-wrap w-full">
                {issues?.length && issues[0].ID ? (
                  <>
                    {issues.map((issue) => (
                      <a
                        key={issue.ID}
                        className="bg flex-row flex-divide interactive no-radius padding"
                        href={`/issues/view/${issue.ID}`}
                      >
                        <h5 className="text-center">{issue.Title}</h5>
                        <h6 className="text-center">
                          Created - {formatDate(issue.CreatedDate)}
                        </h6>
                      </a>
                    ))}
                  </>
                ) : (
                  "No issues available yet"
                )}
              </div>
            </div>
            <div className="flex-column w-half">
              <h3>Latest Comments</h3>
              <div className="flex-column flex-wrap w-full comments">
                {comments?.length && comments[0].ID ? (
                  <>
                    {comments?.map((comment) => (
                      <a
                        key={comment.ID}
                        className="bg flex-row flex-divide interactive no-radius padding"
                        href={`/issues/view/${comment.IssueID}`}
                      >
                        <h6 className="weight-5">{comment.Body}</h6>
                        <h6 className="flex-row flex-center text-center weight-5 author">
                          by{" "}
                          {comment.User.ID > 0
                            ? comment.User.Name
                            : "Administrator"}
                        </h6>
                      </a>
                    ))}
                  </>
                ) : (
                  "No comments available yet"
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
