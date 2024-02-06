"use client";

import { manageIssue } from "@/actions/manage/actions";
import { IssueClass } from "@/models/main/issue";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import Select from "react-select";
import { toast } from "react-toastify";

export default function IssueManager({ admin, user, data, users, projects }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    project: data?.Project ?? null,
    title: data?.Title ?? "",
    description: data?.Description ?? "",
    type: data?.Type ?? 1,
    status: data?.Status ?? 1,
    priority: data?.Priority ?? 2,
  });
  const { project, title, description, type, status, priority } = formData;
  const [assignedTo, setAssigned] = useState(data?.AssignedTo ?? null);
  let issue = new IssueClass();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      project &&
      title &&
      description &&
      type > 0 &&
      status > 0 &&
      priority > 0 &&
      assignedTo.length > 0
    ) {
      issue.ID = data?.ID ?? 0;
      issue.Project = {
        ID: parseInt(project),
        CompanyID: admin?.ID ?? user?.CompanyID,
      };
      issue.AssignedTo = assignedTo;
      issue.Title = title;
      issue.Description = description;
      issue.Type = type;
      issue.Status = status;
      issue.Priority = priority;
      issue.CreatedBy = { ID: admin ? 0 : user?.ID };
      const reqData = {
        entity: JSON.stringify(issue),
        token: admin?.Token ?? user?.Token,
      };
      let res = await manageIssue(reqData);
      if (res?.ID > 0) {
        router.push("/issues");
      } else {
        toast("Server error. Please try again.");
      }
    } else {
      toast("Please fill all necessary fields before submitting.");
    }
  };

  return (
    <>
      <a
        className="interactive flex-row flex-center flex-start"
        aria-label="go back"
        href="/issues/"
      >
        <TiArrowBack />
        Go back
      </a>
      <h2 className="bg form-header flex-row flex-center">
        Creating a new Issue
      </h2>
      <form className="flex-column w-full" onSubmit={onSubmit}>
        <section className="bg content-main self-center w-half flex-column padding">
          <h4>Project</h4>
          <select
            id="project"
            name="project"
            defaultValue={data?.Project ?? "default"}
            onChange={onChange}
          >
            <option value="default" disabled>
              Select a project
            </option>
            {projects?.map((p) => (
              <option key={p.ID} value={p.ID}>
                {p.Name}
              </option>
            ))}
          </select>
          <h4>Issue Title</h4>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title ?? ""}
            placeholder="Reporting bug #7"
            onChange={onChange}
          />
          <h4>Issue Description</h4>
          <textarea
            type="text"
            id="description"
            name="description"
            defaultValue={description ?? ""}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis porta enim, in bibendum nisi tincidunt vitae..."
            onChange={onChange}
          />
          <h4>Issue Type</h4>
          <select
            id="type"
            name="type"
            defaultValue={data?.Type ?? 1}
            onChange={onChange}
          >
            {issue.Type?.map((type) => (
              <option key={type.ID} value={type.ID}>
                {type.Value}
              </option>
            ))}
          </select>
          <h4>Issue Status</h4>
          <select
            id="status"
            name="status"
            defaultValue={data?.Status ?? 1}
            onChange={onChange}
          >
            {issue.Status?.map((s) => (
              <option key={s.ID} value={s.ID}>
                {s.Value}
              </option>
            ))}
          </select>
          <h4>Issue Priority</h4>
          <select
            id="priority"
            name="priority"
            defaultValue={data?.Priority ?? 2}
            onChange={onChange}
          >
            {issue.Priority?.map((priority) => (
              <option key={priority.ID} value={priority.ID}>
                {priority.Value}
              </option>
            ))}
          </select>
          <h4>Assigned Users</h4>
          <Select
            className="r-select"
            classNamePrefix="r-select"
            value={data?.AssignedTo}
            onChange={setAssigned}
            options={users}
            getOptionLabel={(option) =>
              `${option.FirstName} ${option.LastName}`
            }
            getOptionValue={(options) => options["ID"]}
            isMulti
            isSearchable
          />
          {assignedTo < 1 ? (
            <label className="text-small error">
              Issues must have a manager
            </label>
          ) : (
            ""
          )}
        </section>
        <button type="submit" className="bg large">
          Submit
        </button>
      </form>
    </>
  );
}
