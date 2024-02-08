"use server";

import { Priorities, States, Types } from "@/models/main/issue";

import IssueFunctions from "@/components/client/functions/issueFunctions";
import Pager from "../../ui/pager";

export default async function IssuesList({ admin, user, issues }) {
  let typesList = Types;
  let statesList = States;
  let priorityList = Priorities;

  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Issues
      </h2>
      <Pager data={issues} url={"/issues"} />
      <section className="table flex-column">
        <div className="bg t-header h-full">
          <ul className="flex-row h-full w-full">
            <li className="h-full tb-40 flex-row flex-start title">Title</li>
            <li className="h-full tb-20 flex-row flex-center">Type</li>
            <li className="h-full tb-20 flex-row flex-center">Status</li>
            <li className="h-full tb-20 flex-row flex-center">Priority</li>
            <li className="h-full functions flex-row flex-start">Functions</li>
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {issues.data?.map((issue) => (
              <li key={issue.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start tb-40 tb-link"
                  aria-label="manage issues"
                  href={`/issues/manage/${issue.ID}`}
                >
                  {issue.Title}
                </a>
                <div className="flex-row flex-center no-select tb-20 type">
                  {typesList.find((item) => item.ID === issue.Type).Value}
                </div>
                <div className="flex-row flex-center no-select tb-20 status">
                  {statesList.find((item) => item.ID === issue.Status).Value}
                </div>
                <div className="flex-row flex-center no-select tb-20 priority">
                  {
                    priorityList.find((item) => item.ID === issue.Priority)
                      .Value
                  }
                </div>
                <IssueFunctions admin={admin} user={user} issue={issue} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
