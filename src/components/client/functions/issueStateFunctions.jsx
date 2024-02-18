"use client";

import {
  manageIssuePriority,
  manageIssueStatus,
  manageIssueType,
} from "@/actions/manage/actions";
import { Priorities, States, Types } from "@/models/main/issue";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IssueStateFunctions({ admin, user, issue }) {
  const router = useRouter();
  const [modalStates, setModalStates] = useState({
    typeModal: false,
    statusModal: false,
    priorityModal: false,
  });
  const { typeModal, statusModal, priorityModal } = modalStates;

  const handleType = async (e) => {
    issue.Type = e.target.value;
    const reqData = {
      entity: JSON.stringify(issue),
      token: admin?.Token ?? user?.Token,
    };
    let res = await manageIssueType(reqData);
    if (res) {
      setModalStates((prevState) => ({
        ...prevState,
        typeModal: false,
      }));
      router.refresh();
    }
  };

  const handleStatus = async (e) => {
    issue.Status = e.target.value;
    const reqData = {
      entity: JSON.stringify(issue),
      token: admin?.Token ?? user?.Token,
    };
    let res = await manageIssueStatus(reqData);
    if (res) {
      setModalStates((prevState) => ({
        ...prevState,
        statusModal: false,
      }));
      router.refresh();
    }
  };

  const handlePriority = async (e) => {
    issue.Priority = e.target.value;
    const reqData = {
      entity: JSON.stringify(issue),
      token: admin?.Token ?? user?.Token,
    };
    let res = await manageIssuePriority(reqData);
    if (res) {
      setModalStates((prevState) => ({
        ...prevState,
        priorityModal: false,
      }));
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex-row flex-center no-select tb-20 states">
        {typeModal ? (
          <select
            defaultValue={Types.find((item) => item.ID === issue.Type).ID}
            onChange={handleType}
          >
            {Types?.map((type) => (
              <option key={type.ID} value={type.ID}>
                {type.Value}
              </option>
            ))}
          </select>
        ) : (
          <button
            type="button"
            className="h-full w-full no-radius type text-small"
            name="typeModal"
            onClick={(e) =>
              setModalStates((prevState) => ({
                ...prevState,
                [e.target.name]: true,
              }))
            }
          >
            {Types.find((item) => item.ID === issue.Type)?.Value}
          </button>
        )}
      </div>
      <div className="flex-row flex-center no-select tb-20 states">
        {statusModal ? (
          <select
            defaultValue={States.find((item) => item.ID === issue.Status).ID}
            onChange={handleStatus}
          >
            {States?.map((state) => (
              <option key={state.ID} value={state.ID}>
                {state.Value}
              </option>
            ))}
          </select>
        ) : (
          <button
            type="button"
            className="h-full w-full no-radius status text-small"
            name="statusModal"
            onClick={(e) =>
              setModalStates((prevState) => ({
                ...prevState,
                [e.target.name]: true,
              }))
            }
          >
            {States.find((item) => item.ID === issue.Status)?.Value}
          </button>
        )}
      </div>
      <div className="flex-row flex-center no-select tb-20 states">
        {priorityModal ? (
          <select
            defaultValue={
              Priorities.find((item) => item.ID === issue.Priority).ID
            }
            onChange={handlePriority}
          >
            {Priorities?.map((priority) => (
              <option key={priority.ID} value={priority.ID}>
                {priority.Value}
              </option>
            ))}
          </select>
        ) : (
          <button
            type="button"
            className="h-full w-full no-radius priority text-small"
            name="priorityModal"
            onClick={(e) =>
              setModalStates((prevState) => ({
                ...prevState,
                [e.target.name]: true,
              }))
            }
          >
            {Priorities.find((item) => item.ID === issue.Priority)?.Value}
          </button>
        )}
      </div>
    </>
  );
}
