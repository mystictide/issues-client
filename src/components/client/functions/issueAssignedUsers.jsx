"use client";

import { manageAssignedUsers } from "@/actions/manage/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

export default function IssueAssignedUsers({ admin, user, issue, users }) {
  const router = useRouter();
  const [assignedUsersModal, setAssignedUsersModal] = useState(false);
  const [assignedTo, setAssigned] = useState(issue?.AssignedTo ?? null);

  const handleAssignedUsers = async (e) => {
    e.preventDefault();
    issue.AssignedTo = assignedTo;
    const reqData = {
      entity: JSON.stringify(issue),
      token: admin?.Token ?? user?.Token,
    };
    console.log(reqData);
    let res = await manageAssignedUsers(reqData);
    if (res) {
      setAssignedUsersModal(false);
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex-row flex-center no-select assigned">
        {assignedUsersModal ? (
          <form className="flex-row" onSubmit={handleAssignedUsers}>
            <div className="flex-column">
              <Select
                instanceId="assignedTo"
                id="assignedTo"
                name="assignedTo"
                className="r-select radius"
                classNamePrefix="r-select"
                value={assignedTo}
                onChange={setAssigned}
                options={users}
                getOptionLabel={(options) => options["Name"]}
                getOptionValue={(options) => options["ID"]}
                isMulti
                isSearchable
              >
                {users?.map((u) => (
                  <option key={u.ID} value={u.ID}>
                    {u.Name}
                  </option>
                ))}
              </Select>
              {assignedTo < 1 ? (
                <label className="text-small error">
                  Issue must have an assignee
                </label>
              ) : (
                ""
              )}
            </div>

            <button type="submit" className="bg large">
              Save
            </button>
          </form>
        ) : (
          <div
            name="assignedUsersModal"
            className="flex-row flex-wrap interactive"
            onClick={(e) => setAssignedUsersModal(true)}
          >
            {issue.AssignedTo.map((u, index) => (
              <h5 key={u.ID}>
                {u.FirstName} {u.LastName}
                {index + 1 != issue.AssignedTo.length ? "," : ""}
              </h5>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
