"use client";

import { manageProject } from "@/actions/manage/actions";
import { ProjectClass } from "@/models/main/projects";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";

export default function ProjectManager({ admin, user, data, users }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    assignedTo: data?.AssignedTo ?? 0,
    name: data?.Name ?? "",
    description: data?.Description ?? "",
  });
  const { assignedTo, name, description } = formData;
  let project = new ProjectClass();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name && description) {
      project.ID = data?.ID ?? 0;
      project.CompanyID = admin ? admin.ID : user?.CompanyID;
      project.AssignedTo = assignedTo;
      project.Name = name;
      project.Description = description;
      const reqData = {
        entity: JSON.stringify(project),
        token: admin?.Token ?? user?.Token,
      };
      let res = await manageProject(reqData);
      if (res?.ID > 0) {
        router.push("/projects");
      } else {
        toast("Server error. Please try again.");
      }
    } else {
      toast("Please fill all necessary fields before submitting.");
    }
  };

  return (
    <>
      <section className="flex-row relative">
        <a
         className="interactive h-full flex-row flex-center flex-start return"
          aria-label="go back"
          href="/projects/"
        >
          <TiArrowBack />
          Go back
        </a>
        <h2 className="bg form-header flex-row flex-center">
          Creating a new Project
        </h2>
      </section>
      <form className="flex-column w-full" onSubmit={onSubmit}>
        <section className="bg content-main self-center w-half flex-column padding">
          <h4>Project Name</h4>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name ?? ""}
            placeholder="Issue Tracker"
            onChange={onChange}
          />
          <h4>Project Description</h4>
          <textarea
            type="text"
            id="description"
            name="description"
            defaultValue={description ?? ""}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis porta enim, in bibendum nisi tincidunt vitae..."
            onChange={onChange}
          />
          <h4>Project Manager</h4>
          <select
            id="assignedTo"
            name="assignedTo"
            defaultValue={data?.AssignedTo ?? "default"}
            onChange={onChange}
          >
            <option value="default" disabled>
              Select a user
            </option>
            {users?.map((t) => (
              <option key={t.ID} value={t.ID}>
                {t.FirstName} {t.LastName}
              </option>
            ))}
          </select>
        </section>
        <button type="submit" className="bg large">
          Submit
        </button>
      </form>
    </>
  );
}
