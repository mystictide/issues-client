"use server";

import { getIssue, getUsers } from "@/actions/fetch/actions";
import { formatDate, readCookie } from "@/assets/js/helpers";
import IssueAssignedUsers from "@/components/client/functions/issueAssignedUsers";
import IssueStateFunctions from "@/components/client/functions/issueStateFunctions";
import Comments from "@/components/client/lists/commentsList";
import Header from "@/components/server/ui/header";
import { Priorities, States, Types } from "@/models/main/issue";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ViewIssue({ params }) {
  const cookieStore = cookies();
  const admin = readCookie(cookieStore, "admin");
  const user = readCookie(cookieStore, "auth");

  if (!admin && !user) {
    redirect("/account");
  }

  let issue;
  if (params?.id && params?.id > 0) {
    issue = await getIssue({
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
          <div className="issue-view flex-row">
            <div className="w-60">
              <section className="flex-column">
                <div>
                  <h6>Project</h6>
                  <h3>{issue.Project.Name}</h3>
                </div>
                <div className="flex-column">
                  <h3 className="bg padding">{issue.Title}</h3>
                  {admin || user?.Role.RoleAttributes === 1 ? (
                    <div className="flex-row flex-center w-full issue-state">
                      <IssueStateFunctions
                        admin={admin}
                        user={user}
                        issue={issue}
                      />
                    </div>
                  ) : (
                    <div className="flex-row flex-center w-full issue-state">
                      <label className="type flex-row flex-center">
                        {Types.find((item) => item.ID === issue.Type)?.Value}
                      </label>
                      <label className="status flex-row flex-center">
                        {States.find((item) => item.ID === issue.Status)?.Value}
                      </label>
                      <label className="priority flex-row flex-center">
                        {
                          Priorities.find((item) => item.ID === issue.Priority)
                            ?.Value
                        }
                      </label>
                    </div>
                  )}
                  <p className="bg padding">{issue.Description}</p>
                  <div className="flex-row flex-divide">
                    <div className="text-small flex-column">
                      Assigned to{" "}
                      <IssueAssignedUsers
                        admin={admin}
                        user={user}
                        issue={issue}
                        users={users}
                      />
                    </div>
                    <div
                      className="flex-column flex-end"
                      style={{ minWidth: "220px" }}
                    >
                      <h6 className="self-end">
                        Created on {formatDate(issue.CreatedDate)}
                      </h6>
                      <h6 className="self-end">
                        Created by {issue.CreatedBy ?? "Administrator"}
                      </h6>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-40">
              <Comments admin={admin} user={user} issue={issue} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
