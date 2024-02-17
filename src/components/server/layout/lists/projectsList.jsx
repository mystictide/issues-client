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
            {admin ||
            user.Role.Attributes.some((r) => [1, 2, 3].includes(r)) ? (
              <li className="h-full functions padding">Functions</li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {projects.data?.map((project) => (
              <li key={project.ID} className="flex-row w-full">
                <h4 className="flex-row flex-start padding tb-40 tb-link">
                  {project.Name}
                </h4>
                <div className="flex-row flex-start no-select tb-40">
                  <h5 className="weight-5">
                    {createDescription(project.Description)}
                  </h5>
                </div>
                {admin ||
                user.Role.Attributes.some((r) => [1, 2, 3].includes(r)) ? (
                  <ProjectFunctions
                    admin={admin}
                    user={user}
                    project={project}
                  />
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
