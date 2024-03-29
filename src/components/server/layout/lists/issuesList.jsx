"use server";

import IssueFunctions from "@/components/client/functions/issueFunctions";
import IssueStateFunctions from "@/components/client/functions/issueStateFunctions";
import Pager from "../../ui/pager";

export default async function IssuesList({ admin, user, issues }) {
  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Issues
      </h2>
      <Pager data={issues} url={"/issues"} />
      <section className="table flex-column">
        <div className="bg t-header h-full">
          <ul className="flex-row h-full w-full">
            <li className="h-full tb-40 flex-row flex-start title mobile-link">Title</li>
            <li className="h-full tb-20 flex-row flex-center mobile-hide">Type</li>
            <li className="h-full tb-20 flex-row flex-center mobile-hide">Status</li>
            <li className="h-full tb-20 flex-row flex-center mobile-hide">Priority</li>
            {admin ||
            user.Role.Attributes.some((r) => [1, 2, 3, 4].includes(r)) ? (
              <li className="h-full functions flex-row flex-start">
                Functions
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {issues.data?.map((issue) => (
              <li key={issue.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start tb-40 tb-link text-small mobile-link"
                  aria-label="manage issues"
                  href={`/issues/view/${issue.ID}`}
                >
                  {issue.Title}
                </a>
                <IssueStateFunctions admin={admin} user={user} issue={issue} />
                {admin ||
                user.Role.Attributes.some((r) => [1, 2, 3, 4].includes(r)) ? (
                  <IssueFunctions admin={admin} user={user} issue={issue} />
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
