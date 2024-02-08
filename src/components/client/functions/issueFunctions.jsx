"use client";

import { archiveIssue } from "@/actions/archive/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArchive, FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Confirm from "../ui/confirm";
export default function IssueFunctions({ admin, user, issue }) {
  const router = useRouter();
  const [modalState, setModal] = useState(false);
  const [text, setText] = useState(
    issue.IsActive
      ? "Please confirm to archive this issue."
      : "Please confirm to activate this issue."
  );

  const handleArchive = async (option) => {
    if (option) {
      issue.IsActive = !issue.IsActive;
      const reqData = {
        entity: JSON.stringify(issue),
        token: admin?.Token ?? user?.Token,
      };
      let res = await archiveIssue(reqData);
      router.refresh();
      setModal(false);
    } else {
      setModal(false);
    }
  };

  return (
    <>
      <div className="flex-row flex-start functions">
        <a
          title="Manage"
          className="flex-row flex-center interactive"
          aria-label="manage issues"
          href={`/issues/manage/${issue.ID}`}
        >
          <MdModeEdit />
        </a>
        {issue.IsActive ? (
          <button
            title="Archive"
            className="flex-row flex-center icon"
            aria-label="manage issues"
            onClick={() => setModal(true)}
          >
            <FaArchive />
          </button>
        ) : (
          <button
            title="Activate"
            className="flex-row flex-center icon"
            aria-label="manage issues"
            onClick={() => setModal(true)}
          >
            <FaEye />
          </button>
        )}
      </div>
      {modalState ? <Confirm text={text} func={handleArchive} /> : ""}
    </>
  );
}
