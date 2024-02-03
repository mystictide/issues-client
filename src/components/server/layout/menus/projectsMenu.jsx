"use server";

import { FaUsers } from "react-icons/fa";
import { TbHierarchy3 } from "react-icons/tb";

export default async function ProjectsMenu() {
  return (
    <div className="menu">
      <div className="bg flex-column">
        <section className="w-full h-full">
          <ul className="list flex-column flex-center">
            <li className="h-full w-full">
              <a
                className="flex-row flex-center h-full w-full padding"
                aria-label="Projects"
                href="/projects"
              >
                <TbHierarchy3 /> Manage Roles
              </a>
            </li>
            <li className="h-full w-full">
              <a
                className="flex-row flex-center h-full w-full padding"
                aria-label="Projects"
                href="/projects"
              >
                <FaUsers /> Manage Users
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
