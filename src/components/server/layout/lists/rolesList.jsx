"use server";

import { FaEdit } from "react-icons/fa";
import Pager from "../../ui/pager";

export default async function RolesList({ roles }) {
  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Roles
      </h2>
      <Pager data={roles} url={"/settings/roles"} />
      <section className="table flex-column">
        <div className="bg">
          <ul className="flex-row w-full">
            <li className="h-full tb-75 padding">Role Name</li>
            <li className="h-full functions padding">Functions</li>
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {roles.data?.map((role) => (
              <li key={role.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start padding tb-75 tb-link"
                  aria-label="manage roles"
                  href={`/settings/roles/manage/${role.ID}`}
                >
                  {role.Name}
                </a>
                <div className="flex-row flex-start functions">
                  <a
                    className="flex-row flex-center interactive"
                    aria-label="manage roles"
                    href={`/settings/roles/manage/${role.ID}`}
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
