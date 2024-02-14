"use server";

import ProjectFunctions from "@/components/client/functions/projectFunctions";
import DOMPurify from "isomorphic-dompurify";
import Pager from "../../ui/pager";

export default async function ProjectsList({ admin, user, projects }) {
  function createDescription(description) {
    let text =
      description.length >= 56
        ? description.substring(0, 56) + "..."
        : description;
    return DOMPurify.sanitize(text);
  }

  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Projects
      </h2>
      <Pager data={projects} url={"/projects"} />
      <section className="table flex-column">
        <div className="bg">
          <ul className="flex-row w-full">
            <li className="h-full tb-40 padding">Project Name</li>
            <li className="h-full tb-40 padding">Description</li>
            <li className="h-full functions padding">Functions</li>
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {projects.data?.map((project) => (
              <li key={project.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start padding tb-40 tb-link"
                  aria-label="manage projects"
                  href={`/projects/manage/${project.ID}`}
                >
                  {project.Name}
                </a>
                <div className="flex-row flex-start no-select tb-40">
                  {createDescription(project.Description)}
                </div>
                <ProjectFunctions admin={admin} user={user} project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
