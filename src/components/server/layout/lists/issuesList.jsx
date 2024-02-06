"use server";

import { FaEdit } from "react-icons/fa";
import Pager from "../../ui/pager";

export default async function IssuesList({ issues }) {
  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Issues
      </h2>
      <Pager data={issues} url={"/settings/issues"} />
      <section className="table flex-column">
        <div className="bg">
          <ul className="flex-row w-full">
            <li className="h-full tb-40 padding">Title</li>
            <li className="h-full tb-20 padding">Type</li>
            <li className="h-full tb-20 padding">Status</li>
            <li className="h-full tb-20 padding">Priority</li>
            <li className="h-full functions padding">Functions</li>
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {issues.data?.map((issue) => (
              <li key={issue.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start padding tb-40 tb-link"
                  aria-label="manage issues"
                  href={`/issues/manage/${issue.ID}`}
                >
                  {issue.Title}
                </a>
                <div className="flex-row flex-start no-select tb-20">
                  {issue.Type}
                </div>
                <div className="flex-row flex-start no-select tb-20">
                  {issue.Status}
                </div>
                <div className="flex-row flex-start no-select tb-20">
                  {issue.Priority}
                </div>
                <div className="flex-row flex-start functions">
                  <a
                    className="flex-row flex-center interactive"
                    aria-label="manage issues"
                    href={`/settings/issues/manage/${issue.ID}`}
                  >
                    <FaEdit />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
