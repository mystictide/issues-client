"use client";

import { archiveProject } from "@/actions/archive/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArchive, FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Confirm from "../ui/confirm";

export default function ProjectFunctions({ admin, user, project }) {
  const router = useRouter();
  const [modalState, setModal] = useState(false);
  const [text, setText] = useState(
    project.IsActive
      ? "Please confirm to archive this project."
      : "Please confirm to activate this project."
  );

  const handleArchive = async (option) => {
    if (option) {
      project.IsActive = !project.IsActive;
      const reqData = {
        entity: JSON.stringify(project),
        token: admin?.Token ?? user?.Token,
      };
      let res = await archiveProject(reqData);
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
          aria-label="manage projects"
          href={`/projects/manage/${project.ID}`}
        >
          <MdModeEdit />
        </a>
        {project.IsActive ? (
          <button
            title="Archive"
            className="flex-row flex-center icon"
            aria-label="manage projects"
            onClick={() => setModal(true)}
          >
            <FaArchive />
          </button>
        ) : (
          <button
            title="Activate"
            className="flex-row flex-center icon"
            aria-label="manage projects"
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
